from flask import Flask, request, jsonify
from flask_cors import CORS
import asyncio
from scraper.inven_search import fetch_page, get_total_pages, fetch_all_pages, fetch_all_contents, search_posts
from scraper.mari_shop import crawl_mari_shop
from scraper.event_scraper import crawl_event_list
from analysis.population_predictor import (
    generate_population_summary,
    generate_population_summary_short
)
from analysis.population_forecaster import forecast_top_server_growth

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
    data = crawl_mari_shop()
    return jsonify(data)


@app.route("/api/events", methods=["GET"])
def get_events():
    try:
        return jsonify(crawl_event_list())
    except Exception as e:
        return jsonify({"error": str(e)}), 500



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
    
@app.route("/api/forecast/top-growth", methods=["GET"])
def get_top_growth_servers():
    try:
        summary_lines = forecast_top_server_growth()
        return jsonify(summary_lines)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)