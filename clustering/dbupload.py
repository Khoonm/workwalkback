import json
import requests
from datetime import datetime
import re

# JSON 파일 경로
json_file_path = 'data.json'

# 변환된 데이터를 저장할 리스트
transformed_data = []

# USER_KEY_CD는 설정 파일 등에서 읽어와야 합니다. 여기서는 예시로 하드코딩합니다.
user_key = 'AADS1251'

# JSON 파일 줄 단위로 읽기
with open(json_file_path, 'r', encoding='utf-8') as file:
    for line in file:
        try:
            item = json.loads(line.strip())
            timestamp = item.get('Timestamp')
            url = item.get('URL')
            text = item.get('Text', '')

            # Timestamp를 datetime 객체로 변환
            dt_object = datetime.fromtimestamp(timestamp)
            date_str = dt_object.strftime("%Y-%m-%d")
            time_str = dt_object.strftime("%H:%M")

            # URL 데이터 변환
            url_data = text.replace('/n', '')
            url_data = (re.sub(r'[^a-zA-Z0-9가-힣\s]', '', url_data)).lower()

            if not url_data:
                url_data = '....'

            add_data = {
                "USER_KEY_CD": user_key,
                "GET_DATE_YMD": date_str,
                "GET_TIME_DT": time_str,
                "URL_STR": url,
                "DATA_STR": url_data,
                "TYPE_FLG": 0  # assuming all data are new for this example
            }

            transformed_data.append(add_data)
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON in line: {line}. Error: {e}")
            continue

# 서버에 데이터 업로드
for item in transformed_data:
    try:
        response = requests.post('http://127.0.0.1:3000/crawledData', json=item)
        if response.status_code == 201:
            print("Data successfully posted to server.")
        else:
            print(f"Failed to post data to server: {response.status_code}")
    except Exception as e:
        print(f"Error while posting data to server: {e}")
