import re
import json
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

def fetch_population_data():
    options = Options()
    # options.add_argument('--headless')  # 디버깅 시엔 주석
    options.add_argument('--disable-gpu')
    options.add_argument('--window-size=1920,1080')
    driver = webdriver.Chrome(options=options)

    try:
        print("[INFO] lostats.net 접속 중...")
        driver.get('https://lostats.net/population/')

        # 충분히 대기 (JS가 느림)
        time.sleep(10)

        html = driver.page_source

        # 디버깅용 저장
        with open("debug_final.html", "w", encoding="utf-8") as f:
            f.write(html)

        # const data = { ... }; 구문 추출
        match = re.search(r"const data\s*=\s*(\{.*?\})\s*;", html, re.DOTALL)
        if not match:
            raise Exception("data 객체를 찾지 못함")

        js_data_raw = match.group(1)

        # JS → JSON 파싱 준비
        js_data_fixed = re.sub(r"(\w+):", r'"\1":', js_data_raw)
        js_data_fixed = js_data_fixed.replace("undefined", "null")

        parsed = json.loads(js_data_fixed)

        result = {}
        for server, values in parsed.items():
            result[server] = {
                "population": values.get("cnt", 0),
                "change": values.get("diff", 0),
                "levelDistribution": values.get("levelDistribution", {})
            }

        print("[INFO] 크롤링 성공")
        return result

    except Exception as e:
        print("[ERROR] 크롤링 실패:", e)
        return {}

    finally:
        driver.quit()
