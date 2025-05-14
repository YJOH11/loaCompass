from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def crawl_mari_shop():
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

    return data