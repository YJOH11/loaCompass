import requests
from bs4 import BeautifulSoup
import uuid

def crawl_event_list():
    url = "https://lostark.game.onstove.com/News/Event/Now"
    headers = {'User-Agent': 'Mozilla/5.0'}

    try:
        resp = requests.get(url, headers=headers)
        soup = BeautifulSoup(resp.text, 'html.parser')

        event_elements = soup.select("div.list.list--event ul li")
        events = []

        for el in event_elements:
            title = el.select_one("span.list__title")
            period = el.select_one("span.list__schedule")
            img = el.select_one("img")
            link = el.select_one("a")

            events.append({
                "id": str(uuid.uuid4()),
                "title": title.text.strip() if title else "",
                "period": period.text.replace("이벤트 기간 : ", "").strip() if period else "",
                "imageUrl": img["src"] if img else "",
                "url": f"https://lostark.game.onstove.com{link['href']}" if link else ""
            })

        return events

    except Exception as e:
        print("이벤트 크롤링 오류:", e)
        return get_default_events()


def get_default_events():
    return [
        {
            "id": "1",
            "title": "환영의 힘을 모아라",
            "imageUrl": "https://cdn-lostark.game.onstove.com/uploadfiles/banner/b2e6ce9ed8d542c784ea99ee01be3c7f.jpg",
            "period": "2025.04.09 06:00 - 05.07 06:00",
            "url": "https://lostark.game.onstove.com/News/Event/Views/2149"
        },
        {
            "id": "2",
            "title": "2025 아트 공모전 본선 투표",
            "imageUrl": "https://cdn-lostark.game.onstove.com/uploadfiles/banner/e5e8ec85f6084fea8d32d5dea5c1d064.jpg",
            "period": "2025.05.07 06:00 - 05.14 06:00",
            "url": "https://lostark.game.onstove.com/News/Event/Views/2150"
        },
        # 나머지도 필요하면 이어서 추가 가능
    ]
