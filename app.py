from flask import Flask, request, jsonify
from flask_cors import CORS
import asyncio

# 크롤러 / 분석기
from scraper.inven_search import fetch_page, get_total_pages, fetch_all_pages, fetch_all_contents, search_posts
from scraper.mari_shop import crawl_mari_shop
from scraper.event_scraper import crawl_event_list
from analysis.population_predictor import (
    generate_population_summary,
    generate_population_summary_short
)
from analysis.population_forecaster import forecast_top_server_growth

# 닉네임 생성기
from nickname_generator import (
    fetch_success_nicknames_from_mysql,
    build_ngram_model,
    generate_nickname,
    refresh_ngram_model,
    ngram_model  # 글로벌 모델
)

app = Flask(__name__)
CORS(app)

BASE_URL = 'https://www.inven.co.kr/board/lostark/5355/'

# ===== Flask 시작 시 n-gram 모델 초기 학습 =====
refresh_ngram_model()

# ===== 인벤 검색 =====
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

# ===== 마리샵 =====
@app.route("/api/shop-mari", methods=["GET"])
def shop_mari():
    return jsonify(crawl_mari_shop())

# ===== 이벤트 =====
@app.route("/api/events", methods=["GET"])
def get_events():
    try:
        return jsonify(crawl_event_list())
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ===== 통계 요약 =====
@app.route("/api/ai-summary", methods=["GET"])
def get_ai_summary():
    mode = request.args.get("mode", "full")
    try:
        if mode == "short":
            return jsonify(generate_population_summary_short())
        else:
            return jsonify(generate_population_summary())
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

# ===== 예측 =====
@app.route("/api/forecast/top-growth", methods=["GET"])
def get_top_growth_servers():
    try:
        return jsonify(forecast_top_server_growth())
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ===== 닉네임 생성기 (n-gram) =====
@app.route("/api/nickname/ngram", methods=["GET"])
def get_ngram_nickname():
    count = int(request.args.get("count", 1))
    length = int(request.args.get("length", 3))

    nicknames = fetch_success_nicknames_from_mysql(limit=1000)
    model = build_ngram_model(nicknames, n=2)

    if model is None:
        return jsonify({"error": "n-gram 모델이 생성되지 않았습니다. 학습 데이터가 부족합니다."}), 500

    result = [generate_nickname(model, length) for _ in range(count)]
    return jsonify(result)

# ===== 서버 실행 =====
if __name__ == '__main__':
    app.run(port=5000, debug=True)
