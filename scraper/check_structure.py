import requests
from bs4 import BeautifulSoup

def check_inven_structure():
    url = 'https://www.inven.co.kr/board/lostark/5355/'
    headers = {'User-Agent': 'Mozilla/5.0'}
    
    try:
        resp = requests.get(url, headers=headers)
        resp.raise_for_status()
        
        soup = BeautifulSoup(resp.text, 'html.parser')
        
        # 게시판 구조 확인
        board_list = soup.select('div.board_list')
        if board_list:
            print("div.board_list 존재함")
        else:
            print("div.board_list 없음")
            
        table_list = soup.select('table.board_list')
        if table_list:
            print("table.board_list 존재함")
        else:
            print("table.board_list 없음")
        
        # 게시글 목록 확인
        posts = soup.select('tbody tr')
        if posts:
            print(f"tbody tr 태그 {len(posts)}개 찾음")
            print("첫 번째 게시글 예시:")
            print(posts[0])
        else:
            print("tbody tr 태그 없음")
            
        # 다른 가능한 게시글 목록 구조 확인
        list_items = soup.select('li.item')
        if list_items:
            print(f"li.item 태그 {len(list_items)}개 찾음")
            print("첫 번째 항목 예시:")
            print(list_items[0])
        
        # 제목 링크 예시 확인
        links = soup.select('a.subject-link')
        if links:
            print(f"a.subject-link 태그 {len(links)}개 찾음")
            for i, link in enumerate(links[:2]):
                print(f"링크 {i+1}: {link.get('href')} | 제목: {link.text.strip()}")
        
    except Exception as e:
        print(f"오류 발생: {e}")

if __name__ == "__main__":
    check_inven_structure() 