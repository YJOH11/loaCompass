import requests
from bs4 import BeautifulSoup
import time
import re

# (1) 페이지 HTML 가져오기
def fetch_page(url, page=1):
    params = {'page': page}
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
    resp = requests.get(url, params=params, headers=headers)
    resp.raise_for_status()
    return resp.text

# (2) 게시글 목록에서 제목·링크·날짜 파싱하기
def parse_list(html):
    soup = BeautifulSoup(html, 'html.parser')
    posts = []
    seen_links = set()  # 중복 링크 확인용

    # 변경된 구조: tbody tr 직접 선택
    for row in soup.select('tbody tr'):
        # 공지나 빈칸은 건너뛰기
        a = row.select_one('a.subject-link')
        if not a:
            continue

        # 링크 확인하여 중복 게시글 필터링
        link = a['href'] if a['href'].startswith('http') else 'https://www.inven.co.kr' + a['href']
        if link in seen_links:
            continue
        seen_links.add(link)
            
        # 제목에서 서버명(대괄호) 추출
        title_text = a.text.strip()
        server_match = re.search(r'\[(.*?)\]', title_text)
        server = server_match.group(1) if server_match else '기타'
        
        title = title_text
        
        # 날짜 필드 선택
        date_cell = row.select_one('td.date')
        date = date_cell.text.strip() if date_cell else '날짜 없음'

        # 뷰 카운트(조회수) 추가
        view_cell = row.select_one('td.view')
        views = view_cell.text.strip() if view_cell else '0'

        posts.append({
            'title': title,
            'server': server,
            'link': link,
            'date': date,
            'views': views
        })
    return posts

# (3) 각 글 본문 가져와서 text로 뽑아내기
def parse_content(html):
    soup = BeautifulSoup(html, 'html.parser')

    # 인벤 게시글 본문 박스 (변경된 CSS 선택자)
    content_div = soup.select_one('div.contentBody') or soup.select_one('div.view_content')
    if not content_div:
        return ''
    # .get_text()로 내부 텍스트만 추출
    return content_div.get_text(separator='\n', strip=True)

# (4) 키워드로 제목+본문 검색 (개선된 검색 기능)
def search_posts(posts, kw, content_search=False):
    if not kw:  # 키워드가 비어있으면 모든 게시글 반환
        return posts
        
    kw = kw.lower().strip()
    results = []
    seen_links = set()  # 검색 결과 중복 제거용
    
    for p in posts:
        # 링크 기준 중복 제거
        if p['link'] in seen_links:
            continue
            
        title = p['title'].lower()
        server = p['server'].lower()
        
        # 1. 제목만 검색할 경우
        if not content_search:
            if kw in title or kw in server:
                results.append(p)
                seen_links.add(p['link'])
        # 2. 제목+본문 검색
        else:
            content = p.get('content', '').lower()
            if kw in title or kw in server or kw in content:
                results.append(p)
                seen_links.add(p['link'])
                
    return results


# (5) 실행부
if __name__ == '__main__':
    BASE_URL = 'https://www.inven.co.kr/board/lostark/5355/'
    all_posts = []
    page_count = 3  # 크롤링할 페이지 수
    all_links = set()  # 전체 링크 중복 제거용

    print(f'인벤 로스트아크 서버 사건/사고 게시판 크롤링 시작')
    print(f'최근 {page_count}페이지 크롤링 중...')
    
    # 페이지 크롤링
    for pg in range(1, page_count+1):
        print(f'페이지 {pg} 크롤링 중...')
        html = fetch_page(BASE_URL, page=pg)
        page_posts = parse_list(html)
        
        # 전체 게시글 중복 제거
        unique_posts = []
        for post in page_posts:
            if post['link'] not in all_links:
                unique_posts.append(post)
                all_links.add(post['link'])
                
        all_posts.extend(unique_posts)
        time.sleep(0.5)  # 서버 부하 방지

    print(f'총 {len(all_posts)}개 게시글 수집 완료')
    
    # 키워드 검색 (제목만)
    while True:
        print("\n=== 검색 옵션 ===")
        print("1. 제목 검색")
        print("2. 제목+본문 검색 (추가 시간 소요)")
        print("3. 종료")
        
        option = input("옵션을 선택하세요 (1/2/3): ")
        
        if option == '3':
            print("프로그램을 종료합니다.")
            break
            
        kw = input('검색할 키워드를 입력하세요 (서버명 또는 내용): ')
        
        # 본문 검색 선택시 본문 크롤링
        if option == '2':
            print("본문 크롤링을 시작합니다. 시간이 다소 소요될 수 있습니다...")
            for i, p in enumerate(all_posts):
                print(f'글 ({i+1}/{len(all_posts)}) 크롤링 중...')
                try:
                    html = requests.get(p['link'], headers={'User-Agent':'Mozilla/5.0'}).text
                    p['content'] = parse_content(html)
                    time.sleep(0.5)  # 서버 부하 방지
                except Exception as e:
                    print(f'오류 발생: {e}')
                    p['content'] = ''
            
            results = search_posts(all_posts, kw, content_search=True)
        else:
            # 제목만 검색
            results = search_posts(all_posts, kw, content_search=False)

        # 결과 출력
        print(f'\n=== 검색 결과: {len(results)}건 ===')
        for i, r in enumerate(results):
            print(f"{i+1}. [{r['server']}] | {r['date']} | 조회수: {r['views']}")
            title = r['title'].replace('\n', ' ').strip()
            print(f"   제목: {title}")
            print(f"   링크: {r['link']}")
            print("")
