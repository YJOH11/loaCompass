import requests
from bs4 import BeautifulSoup
import time
import re
import asyncio
import aiohttp
from tqdm import tqdm

# (1) 비동기로 페이지 HTML 가져오기
async def fetch_page_async(session, url="https://www.inven.co.kr/board/lostark/5355/", page=1, name=None, keyword=None):
    """
    url: 크롤링할 Inven 게시판 URL (끝에 슬래시 / 붙여주세요)
    page: 일반 목록 페이징 시 사용할 page 파라미터
    name: 검색 범위 ('subject' 또는 'content'). 검색 모드가 아니면 None
    keyword: 검색어. 검색 모드가 아니면 None
    """
    params = {}

    if name is not None and keyword is not None:
        # 서버 검색 API 사용: p, name, keyword
        params['p']       = page
        params['name']    = name      # 'subject' or 'content'
        params['keyword'] = keyword
    else:
        # 일반 목록 페이징
        params['page'] = page

    headers = {
        'User-Agent': (
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
            'AppleWebKit/537.36 (KHTML, like Gecko) '
            'Chrome/91.0.4472.124 Safari/537.36'
        )
    }

    async with session.get(url, params=params, headers=headers) as response:
        response.raise_for_status()
        return await response.text()

# 기존 동기 방식 함수 (비동기 미지원 환경을 위해 유지)
def fetch_page(url="https://www.inven.co.kr/board/lostark/5355/", page=1, name=None, keyword=None):
    """
    url: 크롤링할 Inven 게시판 URL (끝에 슬래시 / 붙여주세요)
    page: 일반 목록 페이징 시 사용할 page 파라미터
    name: 검색 범위 ('subject' 또는 'content'). 검색 모드가 아니면 None
    keyword: 검색어. 검색 모드가 아니면 None
    """
    params = {}

    if name is not None and keyword is not None:
        # 서버 검색 API 사용: p, name, keyword
        params['p']       = page
        params['name']    = name      # 'subject' or 'content'
        params['keyword'] = keyword
    else:
        # 일반 목록 페이징
        params['page'] = page

    headers = {
        'User-Agent': (
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
            'AppleWebKit/537.36 (KHTML, like Gecko) '
            'Chrome/91.0.4472.124 Safari/537.36'
        )
    }

    resp = requests.get(url, params=params, headers=headers)
    resp.raise_for_status()
    return resp.text

# (2) 총 페이지 수 파악하기
def get_total_pages(html):
    soup = BeautifulSoup(html, 'html.parser')
    
    # 페이지 네비게이션 찾기 - 다양한 클래스명 시도
    for selector in ['div.pagingWrap a', 'div.pageNav a', 'div.pagination a', 'a.page-link']:
        pagination = soup.select(selector)
        if pagination:
            break
    
    if not pagination:
        # 페이지 정보가 없으면 기본값으로 설정
        print("페이지 네비게이션을 찾을 수 없어 기본값으로 50페이지를 설정합니다.")
        return 50
    
    # 페이지 번호 추출
    max_page = 1
    for a in pagination:
        try:
            page_text = a.text.strip()
            # 숫자인 경우만 처리
            if page_text.isdigit():
                page_num = int(page_text)
                if page_num > max_page:
                    max_page = page_num
        except (ValueError, AttributeError):
            continue
    
    # 페이지 수가 지나치게 작으면 기본값 설정
    if max_page <= 1:
        print("페이지 수가 1로 감지되어 기본값으로 50페이지를 설정합니다.")
        return 50
        
    return max_page

# (3) 게시글 목록에서 제목·링크·날짜 파싱하기
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

# (4) 각 글 본문 가져와서 text로 뽑아내기
def parse_content(html):
    soup = BeautifulSoup(html, 'html.parser')

    # 인벤 게시글 본문 박스 (변경된 CSS 선택자)
    content_div = soup.select_one('div.contentBody') or soup.select_one('div.view_content')
    if not content_div:
        return ''
    # .get_text()로 내부 텍스트만 추출
    return content_div.get_text(separator='\n', strip=True)

# (5) 비동기로 여러 페이지 가져오기
async def fetch_all_pages(url, total_pages, name=None, keyword=None, max_concurrent=5):
    """
    여러 페이지를 비동기로 병렬 가져오기
    
    url: 크롤링할 URL
    total_pages: 가져올 총 페이지 수
    name, keyword: 검색 파라미터 (없으면 None)
    max_concurrent: 동시 요청 제한 수
    """
    # TCP 연결 수 제한 (서버 부하 방지)
    connector = aiohttp.TCPConnector(limit_per_host=max_concurrent)
    
    all_posts = []
    all_links = set()
    
    async with aiohttp.ClientSession(connector=connector) as session:
        # 모든 페이지 요청을 준비
        tasks = []
        for page in range(1, total_pages+1):
            tasks.append(fetch_page_async(session, url, page, name, keyword))
        
        # 프로그레스바를 위한 tqdm 설정
        pbar = tqdm(total=total_pages, desc="페이지 다운로드")
        
        # 비동기로 모든 페이지 가져오기
        for future in asyncio.as_completed(tasks):
            html = await future
            page_posts = parse_list(html)
            
            # 중복 제거하며 게시글 추가
            for post in page_posts:
                if post['link'] not in all_links:
                    all_posts.append(post)
                    all_links.add(post['link'])
            
            # 프로그레스 바 업데이트
            pbar.update(1)
        
        pbar.close()
        
    return all_posts

# (6) 비동기로 게시글 본문 가져오기
async def fetch_all_contents(posts, max_concurrent=5):
    """
    여러 게시글의 본문을 비동기로 가져오기
    
    posts: 게시글 목록 (link 필드가 있어야 함)
    max_concurrent: 동시 요청 제한 수
    """
    connector = aiohttp.TCPConnector(limit_per_host=max_concurrent)
    
    async with aiohttp.ClientSession(connector=connector) as session:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        # 프로그레스바 설정
        pbar = tqdm(total=len(posts), desc="본문 다운로드")
        
        # 모든 게시글 본문 가져오기
        for post in posts:
            try:
                async with session.get(post['link'], headers=headers) as response:
                    html = await response.text()
                    post['content'] = parse_content(html)
            except Exception as e:
                print(f"본문 가져오기 오류: {e}")
                post['content'] = ''
            finally:
                pbar.update(1)
                # 약간의 지연 (서버 부하 방지)
                await asyncio.sleep(0.1)
        
        pbar.close()
    
    return posts

# (7) 키워드로 제목+본문 검색
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

# (8) 비동기 메인 실행 함수
async def async_main():
    BASE_URL = 'https://www.inven.co.kr/board/lostark/5355/'
    
    while True:
        print("\n=== 검색 옵션 ===")
        print("1. 제목 검색 (서버 필터링)")
        print("2. 본문 검색 (서버 필터링)")
        print("3. 종료")
        
        option = input("옵션을 선택하세요 (1/2/3): ")
        
        if option == '3':
            print("프로그램을 종료합니다.")
            break
        elif option not in ('1','2'):
            print("1, 2, 3 중 하나를 입력하세요.")
            continue

        kw = input('검색할 키워드를 입력하세요: ').strip()
        if not kw:
            print("키워드를 입력해야 검색합니다.")
            continue
            
        # 동시 요청 수 
        max_concurrent = 10
        try:
            concurrent_input = input(f'동시 요청 수를 입력하세요 (기본값: {max_concurrent}, 1~20): ')
            if concurrent_input.strip():
                max_concurrent = max(1, min(20, int(concurrent_input)))
        except ValueError:
            print(f"기본값 {max_concurrent}을 사용합니다.")

        # 서버 검색 API 파라미터 설정
        #  - 제목만: name='subject'
        #  - 본문까지: name='content'
        name = 'subject' if option == '1' else 'content'

        # 1) 검색 첫 페이지 가져와서 전체 검색 페이지 수 파악
        first_html   = fetch_page(BASE_URL, page=1, name=name, keyword=kw)
        total_pages  = get_total_pages(first_html)
        print(f'검색 결과 총 {total_pages}페이지를 Inven 서버에서 가져옵니다.')
        
        # 2) 비동기로 모든 페이지 가져오기
        start_time = time.time()
        search_results = await fetch_all_pages(
            BASE_URL, 
            total_pages, 
            name=name, 
            keyword=kw,
            max_concurrent=max_concurrent
        )
        
        # 3) (옵션) 본문도 가져오기
        if option == '2' and input('본문 내용도 가져오시겠습니까? (y/n): ').lower() == 'y':
            search_results = await fetch_all_contents(
                search_results,
                max_concurrent=max_concurrent
            )
        
        end_time = time.time()
        
        # 4) 결과 출력
        print(f'\n=== 검색 완료: {len(search_results)}건 ({end_time-start_time:.2f}초) ===')
        for i, p in enumerate(search_results, 1):
            print(f"{i}. [{p['server']}] | {p['date']} | 조회수: {p['views']}")
            title = p['title'].replace('\n', ' ').strip()
            print(f"   제목: {title}")
            print(f"   링크: {p['link']}\n")

# (9) 실행부
if __name__ == '__main__':
    try:
        # Python 3.7 이상에서 asyncio.run() 사용
        asyncio.run(async_main())
    except (KeyboardInterrupt, SystemExit):
        print("\n프로그램이 종료되었습니다.")
    except Exception as e:
        print(f"오류 발생: {e}")
