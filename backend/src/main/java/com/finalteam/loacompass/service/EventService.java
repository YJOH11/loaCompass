//package com.finalteam.loacompass.service;
//
//import com.finalteam.loacompass.dto.EventDto;
//import org.jsoup.Jsoup;
//import org.jsoup.nodes.Document;
//import org.jsoup.nodes.Element;
//import org.jsoup.select.Elements;
//import org.springframework.stereotype.Service;
//
//import java.io.IOException;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.UUID;
//
//@Service
//public class EventService {
//
//    private static final String LOSTARK_EVENT_URL = "https://lostark.game.onstove.com/News/Event/Now";
//
//    public List<EventDto> getEvents() {
//        List<EventDto> events = new ArrayList<>();
//
//        try {
//            Document doc = Jsoup.connect(LOSTARK_EVENT_URL).get();
//            Elements eventElements = doc.select("div.list.list--event ul li");
//
//            for (Element event : eventElements) {
//                EventDto eventDto = new EventDto();
//
//                // 고유 ID 생성
//                eventDto.setId(UUID.randomUUID().toString());
//
//                // 이벤트 제목
//                Element title = event.selectFirst("span.list__title");
//                if (title != null) {
//                    eventDto.setTitle(title.text());
//                }
//
//                // 이벤트 기간
//                Element period = event.selectFirst("span.list__schedule");
//                if (period != null) {
//                    eventDto.setPeriod(period.text().replace("이벤트 기간 : ", "").trim());
//                }
//
//                // 이벤트 이미지
//                Element img = event.selectFirst("img");
//                if (img != null) {
//                    eventDto.setImageUrl(img.attr("src"));
//                }
//
//                // 이벤트 상세 URL
//                Element link = event.selectFirst("a");
//                if (link != null) {
//                    String href = link.attr("href");
//                    if (!href.startsWith("http")) {
//                        href = "https://lostark.game.onstove.com" + href;
//                    }
//                    eventDto.setUrl(href);
//                }
//
//                events.add(eventDto);
//            }
//        } catch (IOException e) {
//            // 실제 운영에서는 로깅 처리
//            System.err.println("이벤트 정보를 가져오는 중 오류 발생: " + e.getMessage());
//            // 오류 발생 시 기본 데이터 반환
//            return getDefaultEvents();
//        }
//
//        return events.isEmpty() ? getDefaultEvents() : events;
//    }
//
//    // 기본 이벤트 데이터 (API 오류 시 반환용)
//    private List<EventDto> getDefaultEvents() {
//        List<EventDto> defaultEvents = new ArrayList<>();
//
//        defaultEvents.add(new EventDto(
//                "1",
//                "환영의 힘을 모아라",
//                "https://cdn-lostark.game.onstove.com/uploadfiles/banner/b2e6ce9ed8d542c784ea99ee01be3c7f.jpg",
//                "2025.04.09 06:00 - 05.07 06:00",
//                "https://lostark.game.onstove.com/News/Event/Views/2149"));
//
//        defaultEvents.add(new EventDto(
//                "2",
//                "2025 아트 공모전 본선 투표",
//                "https://cdn-lostark.game.onstove.com/uploadfiles/banner/e5e8ec85f6084fea8d32d5dea5c1d064.jpg",
//                "2025.05.07 06:00 - 05.14 06:00",
//                "https://lostark.game.onstove.com/News/Event/Views/2150"));
//
//        defaultEvents.add(new EventDto(
//                "3",
//                "반짝반짝 교환소",
//                "https://cdn-lostark.game.onstove.com/uploadfiles/banner/ff04ec5b9f3d4784b7a7d166a70af6c9.jpg",
//                "2025.04.30 21:00 - 05.28 06:00",
//                "https://lostark.game.onstove.com/News/Event/Views/2148"));
//
//        defaultEvents.add(new EventDto(
//                "4",
//                "봄이 왔냥, PC방 PARTY TIME",
//                "https://cdn-lostark.game.onstove.com/uploadfiles/banner/7e694a53e0f94e62b2ef0a1ba70eeb08.jpg",
//                "2025.03.12 06:00 - 05.21 06:00",
//                "https://lostark.game.onstove.com/News/Event/Views/2145"));
//
//        defaultEvents.add(new EventDto(
//                "5",
//                "피크닉 도시락 만들기",
//                "https://cdn-lostark.game.onstove.com/uploadfiles/banner/7c76a4d3600844cebe5e50b97d97dd29.jpg",
//                "2025.05.07 06:00 - 06.04 06:00",
//                "https://lostark.game.onstove.com/News/Event/Views/2151"));
//
//        defaultEvents.add(new EventDto(
//                "6",
//                "강습 : 림레이크",
//                "https://cdn-lostark.game.onstove.com/uploadfiles/banner/8b344e1f69a74c9d80d87680ec334402.jpg",
//                "2025.03.26 06:00 - 06.18 06:00",
//                "https://lostark.game.onstove.com/News/Event/Views/2147"));
//
//        return defaultEvents;
//    }
//}