/*
package com.finalteam.loacompass.controller;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.*;

@RestController
public class ShopController {

    @CrossOrigin
    @GetMapping("/api/shop")
    public List<Map<String, String>> getShopItems() throws IOException {
        List<Map<String, String>> result = new ArrayList<>();

        Document doc = Jsoup.connect("https://lostark.game.onstove.com/Shop")
                .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)")
                .timeout(5000)
                .get();

        System.out.println(doc.html());

        // ✅ 실제 구조를 확인해서 여기에 정확한 selector 넣어야 함
        Elements items = doc.select(".item"); // 예시 - 실제 구조 확인 필요

        for (Element item : items) {
            String title = item.select(".item-name").text();
            String imageUrl = item.select("img").attr("src");
            String time = item.select(".item-time").text();

            Map<String, String> map = new HashMap<>();
            map.put("title", title);
            map.put("image", imageUrl);
            map.put("time", time);
            result.add(map);
        }

        return result;
    }
}
*/
