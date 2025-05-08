package com.finalteam.loacompass.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.finalteam.loacompass.dto.GemDto;
import org.jsoup.Jsoup;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class GemTooltipParser {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static void populateGemDetails(GemDto gem) {
        try {
            JsonNode root = objectMapper.readTree(gem.getTooltip());
            if (root.isTextual()) {
                root = objectMapper.readTree(root.asText());
            }

            // 효과 추출
            JsonNode effectNode = root.path("Element_006").path("value").path("Element_001");
            if (effectNode.isTextual()) {
                String raw = Jsoup.parse(effectNode.asText().replace("<BR>", "\n")).text();
                gem.setEffect(raw);

                // 스킬명 추출 예: [홀리나이트] 신성의 오라 지원 효과 7% 증가
                Matcher matcher = Pattern.compile("\\[(.*?)\\]\\s*(.*?)\\s*지원 효과.*").matcher(raw);
                if (matcher.find()) {
                    String skill = matcher.group(2).trim();
                    gem.setSkillName(skill);
                }
            }

            // 이름에서 보석 타입 추출
            String plainName = Jsoup.parse(gem.getName()).text();
            gem.setName(plainName);

            if (plainName.contains("멸화")) gem.setGemType("멸화");
            else if (plainName.contains("홍염")) gem.setGemType("홍염");
            else if (plainName.contains("겁화")) gem.setGemType("겁화");
            else if (plainName.contains("작열")) gem.setGemType("작열");
            else gem.setGemType("기타");

        } catch (Exception e) {
            System.err.println("Gem tooltip parsing failed for [" + gem.getName() + "]: " + e.getMessage());
        }
    }
}
