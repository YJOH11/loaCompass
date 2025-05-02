package com.finalteam.loacompass.controller;// src/main/java/com/finalteam/loacompass/controller/UpdateController.java

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class UpdateController {

    @CrossOrigin
    @GetMapping("/api/update")
    public List<Map<String, String>> getUpdateNotices() throws IOException {
        List<Map<String, String>> result = new ArrayList<>();

        for (int page = 1; page <= 2; page++) {
            String url = "https://lostark.game.onstove.com/News/Notice/List?page=" + page;

            Document doc = Jsoup.connect(url)
                    .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36")
                    .timeout(5000)
                    .get();

            Elements items = doc.select("li:has(.list__title)");

            for (Element item : items) {
                String title = item.select(".list__title").text();
                String href = item.select("a").attr("href");
                String date = item.select(".list__date").text();

                if (title.contains("업데이트")) {
                    Map<String, String> notice = new HashMap<>();
                    notice.put("title", title);
                    notice.put("link", "https://lostark.game.onstove.com" + href);
                    notice.put("date", date);
                    result.add(notice);
                }
            }
        }

        return result;
    }
}
