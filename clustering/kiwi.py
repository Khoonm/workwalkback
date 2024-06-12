from sklearn.feature_extraction.text import CountVectorizer
from kiwipiepy import Kiwi

# 불용어를 정의한다
user_stop_word = ["안녕", "안녕하세요", "때문", "지금", "감사", "네", "감사합니다"]

# 토크나이저에 명사만 추가한다
extract_pos_list = ["NNG", "NNP", "NNB", "NR", "NP"]

class CustomTokenizer:
  def __init__(self, kiwi):
    self.kiwi = kiwi
  def __call__(self, text):
    result = list()
    for word in self.kiwi.tokenize(text):
      # 명사이고, 길이가 2이상인 단어이고, 불용어 리스트에 없으면 추가하기
      if word[1] in extract_pos_list and len(word[0]) > 1 and word[0] not in user_stop_word:
        result.append(word[0])
    return result

def create_vectorizer():
    custom_tokenizer = CustomTokenizer(Kiwi())
    vectorizer = CountVectorizer(tokenizer=custom_tokenizer, max_features=300)
    return vectorizer
