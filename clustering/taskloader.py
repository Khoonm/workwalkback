import requests

resp = requests.get('http://127.0.0.1:3000/ticket').json()
task = [ticket for ticket in resp if ticket['USER_KEY_CD'] == 'AADS1251' and ticket['STATUS_FLG'] == 1]
task = [ticket['CONTENT_STR'] for ticket in task]
print(task)

# print(topic_model.visualize_term_rank())

# # 한글 폰트 설정
# font_path = "./clustering/content/NanumGothic.ttf"  # 나눔고딕 폰트 경로
# font_prop = fm.FontProperties(fname=font_path).get_name()
# plt.rcParams["font.family"] = font_prop

# plt.figure(figsize=(10, 6))
# sns.barplot(x="Cluster", y="Mean Similarity", data=df_results)
# plt.title("클러스터별 업무 키워드와의 평균 유사도")
# plt.xlabel("클러스터")
# plt.ylabel("평균 유사도")
# plt.ylim(0, 1)
# plt.show()