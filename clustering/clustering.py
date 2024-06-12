import requests
import pandas as pd
import re
from sentence_transformers import SentenceTransformer
from umap import UMAP
from hdbscan import HDBSCAN
from bertopic import BERTopic
from kiwi import create_vectorizer
from sentence_transformers import util
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import matplotlib.font_manager as fm


def datasetLoader():
    # post 할때 FLG가 1이면 temp.txt를 만들거고, 그 txt 파일을 불러오는 형식으로 바꿀 생각.
    # 서버에서 전달 받은 data 사용하기. 결과가 문자열 list이기만 하면 됨.
    # Json 형태로 USER_KEY_CD, GET_DATE_YMD를 포함하는게 낫지 않을까?
    # API 엔드포인트 URL
    url = 'http://127.0.0.1:3000/crawledData'

    # API 호출
    response = requests.get(url)
    response.raise_for_status()  # 오류가 발생하면 예외를 발생시킴

    # JSON 데이터 파싱
    resp = response.json()

    # 각 항목을 data 리스트에 추가
    data = []
    for item in resp:
        try:
            data.append(item)
        except Exception as e:
            print(f"Error processing item: {e}")
            continue

    # 데이터를 pandas DataFrame으로 변환
    df = pd.DataFrame(data)

    dataset = df['DATA_STR'].tolist()


    def preprocess(text):
        # 줄바꿈 문자를 띄어쓰기로 변환
        text = text.replace("\n", " ")
        # 정규식을 사용하여 특수 기호 제거
        text = re.sub(r'[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9\s]', '', text)
        # 불필요한 공백 제거
        text = re.sub(r'\s+', ' ', text).strip()
        return text

    dataset = [preprocess(data) for data in dataset]
    return dataset

def modelLoader(dataset):
    
    embedding_model = SentenceTransformer("sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2")
    embeddings = embedding_model.encode(dataset, show_progress_bar=True)
    umap_model = UMAP(n_neighbors=15, n_components=5, min_dist=0.0, metric='cosine', random_state=42)
    hdbscan_model = HDBSCAN(min_cluster_size=40, metric='euclidean', cluster_selection_method='eom', prediction_data=True)
    vectorizer = create_vectorizer()
    topic_model = BERTopic(
    embedding_model=embedding_model,
    umap_model=umap_model,
    hdbscan_model=hdbscan_model,
    vectorizer_model=vectorizer,
    top_n_words=4,
    verbose=True
    )

    topics, probs = topic_model.fit_transform(dataset, embeddings)

    return topic_model, topics, probs, embedding_model, embeddings

def similarity(embedding_model, embeddings, topics, dataset):
    # 각 군집의 주요 텍스트와 업무 키워드 간의 유사도 검사
    cluster_similarities = []
    # task = ['군집화 및 유사도 검사'] # 업무 티켓 가져와서 사용하기 - 같은 유저의 해당 날짜의 CONTENT_STR
    resp = requests.get('http://127.0.0.1:3000/ticket').json()
    tasks = [ticket for ticket in resp if ticket['USER_KEY_CD'] == 'AADS1251' and ticket['STATUS_FLG'] == 1] # USER_KEY 부분은 인자로 받아서 집어넣기
    tasks = [ticket['CONTENT_STR'] for ticket in tasks]
    for i, task in enumerate(tasks):
        for topic in set(topics):
            topic_indices = [i for i, t in enumerate(topics) if t == topic]
            topic_texts = [dataset[i] for i in topic_indices]
            topic_embeddings = embeddings[topic_indices]

            # 군집 내 텍스트와 업무 키워드 임베딩 생성
            task_embeddings = embedding_model.encode(task)

            # 유사도 계산
            similarities = util.pytorch_cos_sim(topic_embeddings, task_embeddings)

            # 유사도 평균값이 임계값을 넘는지 확인
            similarities_array = np.array(similarities)
            mean_similarity = np.mean(similarities_array)
            cluster_similarities.append((i+1, topic, mean_similarity))

        # 결과 DataFrame 생성
        df_results = pd.DataFrame(cluster_similarities, columns=["Ticket", "Cluster", "Mean Similarity"])

    return df_results

def start():
    dataset = datasetLoader()
    topic_model, topics, probs, embedding_model, embeddings = modelLoader(dataset)
    print(topic_model.get_topic_info()) # 데이터 구조 확인용
    fig = topic_model.visualize_topics(title = "<b>토픽 군집화 이미지</b>") # 이름은 맘대루
    fig.write_html("./topics_visualization.html") # 이부분은 어떻게 할지 고민. html을 저장해서 전송? 아니면 fig를 반환해서 렌더링시 바로 사용?
    df_results = similarity(embedding_model, embeddings, topics, dataset)
    print(df_results) # 데이터 구조 확인용

start()

# 서버의 group 테이블로 post 쏘기