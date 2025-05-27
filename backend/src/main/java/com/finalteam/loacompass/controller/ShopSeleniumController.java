//package com.finalteam.loacompass.controller;
//
//import org.openqa.selenium.By;
//import org.openqa.selenium.WebDriver;
//import org.openqa.selenium.WebElement;
//import org.openqa.selenium.chrome.ChromeDriver;
//import org.openqa.selenium.chrome.ChromeOptions;
//import org.openqa.selenium.support.ui.ExpectedConditions;
//import org.openqa.selenium.support.ui.WebDriverWait;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.time.Duration;
//import java.util.*;
//
//
//@RestController
//public class ShopSeleniumController {
//
//
//
//    @CrossOrigin
//    @GetMapping("/api/shop-selenium")
//    public ResponseEntity<Map<String, Object>> crawlShop() {
//        System.setProperty("webdriver.chrome.driver", "C:/chromedriver/chromedriver.exe");
//
//        List<Map<String, String>> items = new ArrayList<>();
//        String remainTime = "";
//
//        ChromeOptions options = new ChromeOptions();
//        options.addArguments("--headless", "--disable-gpu", "--no-sandbox");
//
//        WebDriver driver = new ChromeDriver(options);
//
//        try {
//            driver.get("https://lostark.game.onstove.com/Shop#mari");
//
//            // ✅ 남은 시간 파싱
//            List<WebElement> timeDigits = driver.findElements(By.cssSelector(".flip-clock-active"));
//            StringBuilder sb = new StringBuilder();
//            for (int i = 0; i < timeDigits.size(); i++) {
//                sb.append(timeDigits.get(i).getAttribute("data-digit"));
//                if ((i + 1) % 2 == 0 && i < timeDigits.size() - 1) {
//                    sb.append(":");
//                }
//            }
//            remainTime = sb.toString();
//
//            // ✅ 아이템 리스트 로드 대기
//            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
//            wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".item-name")));
//
//            // ✅ 아이템 전체 가져오기
//            List<WebElement> elements = driver.findElements(By.cssSelector("ul.list-items > li"));
//            System.out.println("아이템 개수: " + elements.size());
//
//            for (int i = 0; i < Math.min(6, elements.size()); i++) {
//                WebElement el = elements.get(i);
//                try {
//                    String title = el.findElement(By.cssSelector(".item-name")).getText();
//                    String image = el.findElement(By.cssSelector(".thumbs img")).getAttribute("src");
//
//                    WebElement button = el.findElement(By.tagName("button"));
//                    String currency = "crystal", price = "", original = "";
//
//                    try {
//                        WebElement priceBox = button.findElement(By.className("list__price"));
//                        currency = priceBox.findElement(By.className("icon")).getText();
//                        price = priceBox.findElement(By.tagName("em")).getText();
//                        try {
//                            original = priceBox.findElement(By.tagName("del")).getText();
//                        } catch (NoSuchElementException ignore) {}
//                    } catch (Exception e) {
//                        System.out.println("[" + title + "] 가격 파싱 실패");
//                    }
//
//
//
//                    Map<String, String> item = new HashMap<>();
//                    item.put("title", title);
//                    item.put("image", image);
//                    item.put("currency", currency);
//                    item.put("price", price);
//                    item.put("originalPrice", original);
//
//                    items.add(item);
//
//                } catch (Exception e) {
//                    System.out.println("아이템 파싱 실패: " + e.getMessage());
//                }
//            }
//
//        } catch (Exception e) {
//            System.out.println("크롤링 전체 실패: " + e.getMessage());
//        } finally {
//            driver.quit();
//        }
//
//        Map<String, Object> result = new HashMap<>();
//        result.put("remainTime", remainTime);
//        result.put("items", items);
//        return ResponseEntity.ok(result);
//    }
//}
