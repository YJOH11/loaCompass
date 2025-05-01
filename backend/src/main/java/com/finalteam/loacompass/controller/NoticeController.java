package com.finalteam.loacompass.controller;

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
public class NoticeController {

    @CrossOrigin
    @GetMapping("/api/notice")
    public List<Map<String, String>> getNotices() throws IOException {
        List<Map<String, String>> result = new ArrayList<>();

        Document doc = Jsoup.connect("https://lostark.game.onstove.com/News/Notice")
                .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36")
                .timeout(5000)
                .get();

        Elements items = doc.select(".list.list--default > li");

        for (Element item : items) {
            String title = item.select(".list__title").text();
            String href = item.select("a").attr("href");

            if (!title.isEmpty() && !href.isEmpty()) {
                Map<String, String> notice = new HashMap<>();
                notice.put("title", title);
                notice.put("link", "https://lostark.game.onstove.com" + href);
                result.add(notice);
            }
        }

        return result;
    }
}
