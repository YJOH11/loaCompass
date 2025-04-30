from flask import Flask, request, jsonify
from flask_cors import CORS
import asyncio
from scraper.inven_search import fetch_page, get_total_pages, fetch_all_pages, fetch_all_contents, search_posts

app = Flask(__name__)
CORS(app)  # React에서 요청 가능하게 해줌

BASE_URL = 'https://www.inven.co.kr/board/lostark/5355/'

@app.route('/api/search', methods=['GET'])
def search_inven():
    keyword = request.args.get('keyword')
    content_search = request.args.get('content', default='false').lower() == 'true'

    if not keyword:
        return jsonify({"error": "검색어를 입력하세요."}), 400

    try:
        name = 'content' if content_search else 'subject'

        # 1. 첫 페이지 HTML 가져오기
        first_html = fetch_page(BASE_URL, page=1, name=name, keyword=keyword)
        total_pages = get_total_pages(first_html)

        # 2. 전체 페이지 크롤링
        search_results = asyncio.run(fetch_all_pages(BASE_URL, total_pages, name=name, keyword=keyword))

        # 3. 본문도 가져올 경우
        if content_search:
            search_results = asyncio.run(fetch_all_contents(search_results))

        # 4. 키워드 필터링
        filtered = search_posts(search_results, kw=keyword, content_search=content_search)

        return jsonify(filtered)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
