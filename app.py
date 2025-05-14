from flask import Flask, request, jsonify
from flask_cors import CORS
import asyncio
from scraper.inven_search import fetch_page, get_total_pages, fetch_all_pages, fetch_all_contents, search_posts
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

app = Flask(__name__)
CORS(app)

BASE_URL = 'https://www.inven.co.kr/board/lostark/5355/'


@app.route('/api/search', methods=['GET'])
def search_inven():
    keyword = request.args.get('keyword')
    content_search = request.args.get('content', default='false').lower() == 'true'

    if not keyword:
        return jsonify({"error": "검색어를 입력하세요."}), 400

    try:
        name = 'content' if content_search else 'subject'

        first_html = fetch_page(BASE_URL, page=1, name=name, keyword=keyword)
        total_pages = get_total_pages(first_html)

        search_results = asyncio.run(fetch_all_pages(BASE_URL, total_pages, name=name, keyword=keyword))

        if content_search:
            search_results = asyncio.run(fetch_all_contents(search_results))

        filtered = search_posts(search_results, kw=keyword, content_search=content_search)

        return jsonify(filtered)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/shop-mari", methods=["GET"])
def shop_mari():
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")

    driver = webdriver.Chrome(options=options)
    driver.get("https://lostark.game.onstove.com/Shop#mari")

    data = {
        "remainTime": "",
        "items": []
    }

    try:
        # 남은 시간 추출
        WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, ".flip-clock-active"))
        )
        time_digits = driver.find_elements(By.CSS_SELECTOR, ".flip-clock-active")
        remain_time = ""
        for i, digit in enumerate(time_digits):
            remain_time += digit.get_attribute("data-digit")
            if (i + 1) % 2 == 0 and i < len(time_digits) - 1:
                remain_time += ":"
        data["remainTime"] = remain_time

        # 아이템 목록 추출
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "ul.list-items > li"))
        )
        items = driver.find_elements(By.CSS_SELECTOR, "ul.list-items > li")
        for el in items[:6]:
            try:
                title = el.find_element(By.CSS_SELECTOR, ".item-name").text
                image = el.find_element(By.CSS_SELECTOR, ".thumbs img").get_attribute("src")

                price = ""
                original = ""
                price_display = ""
                currency = "crystal"

                try:
                    price = el.find_element(By.CSS_SELECTOR, ".area-amount > .amount").text
                    try:
                        original = el.find_element(By.CSS_SELECTOR, ".area-amount > .amount--through").text
                        price_display = f"{price} {original}"
                    except:
                        original = ""
                        price_display = price
                except Exception as e:
                    print(f"[{title}] 가격 정보 없음: {e}")
                    price = ""
                    original = ""
                    price_display = ""

                data["items"].append({
                    "title": title,
                    "image": image,
                    "currency": currency,
                    "price": price,
                    "originalPrice": original,
                    "priceDisplay": price_display
                })

            except Exception as e:
                print("아이템 파싱 오류:", e)

    except Exception as e:
        print("크롤링 전체 실패:", e)
    finally:
        driver.quit()

    return jsonify(data)


if __name__ == '__main__':
    app.run(port=5000, debug=True)
