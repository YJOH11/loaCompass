package com.finalteam.loacompass.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/gemini")
public class GeminiController {

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping
    public ResponseEntity<?> generateReply(@RequestBody Map<String, String> body) {
        String prompt = body.get("prompt");
        String apiKey = System.getenv("GEMINI_API_KEY");

        if (apiKey == null || apiKey.isEmpty()) {
            return ResponseEntity.status(500).body(Map.of("error", "API 키가 설정되지 않았습니다."));
        }

        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-pro-exp:generateContent?key=" + apiKey;

        Map<String, Object> content = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(Map.of("text", prompt)))
                )
        );

        System.out.println("🌐 프론트에서 받은 prompt: " + prompt);
        System.out.println("🌐 요청 보낼 URL: " + url);
        System.out.println("🌐 요청 보낼 본문: " + content);


        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(content, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);
            System.out.println("📥 상태코드: " + response.getStatusCode());
            System.out.println("📥 헤더: " + response.getHeaders());
            System.out.println("📥 응답 바디: " + response.getBody());



            return ResponseEntity.ok(
                    new ObjectMapper().readValue(response.getBody(), new TypeReference<Map<String, Object>>() {})
            );
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(Map.of("error", e.getResponseBodyAsString()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "서버 내부 오류"));
        }
    }



}
