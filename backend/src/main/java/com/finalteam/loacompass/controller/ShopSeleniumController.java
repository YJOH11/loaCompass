package com.finalteam.loacompass.controller;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.*;

@RestController
public class ShopSeleniumController {

    @CrossOrigin
    @GetMapping("/api/shop-selenium")
    public List<Map<String, String>> crawlShop() {
        System.setProperty("webdriver.chrome.driver", "C:/chromedriver/chromedriver.exe");
        List<Map<String, String>> result = new ArrayList<>();

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless", "--disable-gpu", "--no-sandbox");

        WebDriver driver = new ChromeDriver(options); // ✅ driver 먼저 선언

        try {
            driver.get("https://lostark.game.onstove.com/Shop#mari");

            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("ul.list-items > li")));

            List<WebElement> items = driver.findElements(By.cssSelector("ul.list-items > li"));
            System.out.println("아이템 개수: " + items.size());

            int limit = 6;
            for (int i = 0; i < items.size() && i < limit; i++) {
                WebElement item = items.get(i);
                try {
                    String name = item.findElement(By.cssSelector(".item-name")).getText();
                    String image = item.findElement(By.cssSelector(".thumbs img")).getAttribute("src");

                    Map<String, String> map = new HashMap<>();
                    map.put("title", name);
                    map.put("image", image);
                    result.add(map);
                } catch (Exception e) {
                    System.out.println("아이템 파싱 실패: " + e.getMessage());
                }
            }

        } catch (Exception e) {
            System.out.println("크롤링 실패: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
        }

        return result;
    }
}
