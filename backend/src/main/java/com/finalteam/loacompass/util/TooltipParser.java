package com.finalteam.loacompass.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.finalteam.loacompass.dto.EquipmentDto;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TooltipParser {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static void populateEquipmentDetails(EquipmentDto dto) {
        try {
            String rawTooltip = dto.getTooltip();

            JsonNode tooltipJson = objectMapper.readTree(rawTooltip);
            if (tooltipJson.isTextual()) {
                tooltipJson = objectMapper.readTree(tooltipJson.asText());
            }

            // 강화 단계
            JsonNode refinementNode = tooltipJson.path("Element_005").path("value");

            if (refinementNode.isTextual()) {
                String cleaned = refinementNode.asText().replaceAll("<.*?>", ""); // HTML 태그 제거
                Matcher matcher = Pattern.compile("(\\d+)단계").matcher(cleaned);
                if (matcher.find()) {
                    dto.setRefinementLevel(Integer.parseInt(matcher.group(1)));
                }
            }

            // 초월 단계 및 포인트
            JsonNode transcendenceTopStr = tooltipJson.path("Element_009").path("value")
                    .path("Element_000").path("topStr");

            if (transcendenceTopStr.isTextual()) {
                String topStr = transcendenceTopStr.asText();

                // 초월 단계 추출 (예: 7단계)
                Matcher levelMatcher = Pattern.compile("초월.*?(\\d+)단계").matcher(topStr);
                if (levelMatcher.find()) {
                    dto.setTranscendenceLevel(Integer.parseInt(levelMatcher.group(1)));
                }

                // 장비별 초월 포인트 추출 (예: >21)
                Matcher pointMatcher = Pattern.compile("img[^>]*>(\\d+)").matcher(topStr);
                if (pointMatcher.find()) {
                    dto.setTranscendencePoint(Integer.parseInt(pointMatcher.group(1)));
                }
            }

            JsonNode transcendenceTotalNode = tooltipJson.path("Element_009")
                    .path("value").path("Element_000").path("contentStr")
                    .path("Element_001").path("contentStr");

            if (transcendenceTotalNode.isTextual()) {
                Matcher matcher = Pattern.compile("총.*?>(\\d+)개").matcher(transcendenceTotalNode.asText());
                if (matcher.find()) {
                }
            }

            // 엘릭서 이름
            List<String> elixirOptions = new ArrayList<>();

            JsonNode contentGroup = tooltipJson.path("Element_010").path("value")
                    .path("Element_000").path("contentStr");

            if (contentGroup != null && contentGroup.isObject()) {
                contentGroup.fields().forEachRemaining(entry -> {
                    JsonNode content = entry.getValue().path("contentStr");
                    if (content.isTextual()) {
                        String text = content.asText().replaceAll("<.*?>", "").trim(); // HTML 제거
                        // 예: "[투구] 선각자 (질서) Lv.5 아군 공격력 강화 효과 +4%"
                        String[] parts = text.split("Lv\\."); // "Lv." 기준으로 앞부분 추출
                        if (parts.length > 0) {
                            String effectName = parts[0].replaceAll("\\[.*?\\]", "").trim(); // [투구] 제거
                            elixirOptions.add(effectName);
                        }
                    }
                });
                dto.setElixirOptions(elixirOptions);
            }

            // 엘릭서 효과
            JsonNode elixirEffectGroup = tooltipJson.path("Element_011").path("value")
                    .path("Element_000").path("contentStr");
            if (elixirEffectGroup != null && elixirEffectGroup.isObject()) {
                List<String> effects = new ArrayList<>();
                elixirEffectGroup.fields().forEachRemaining(entry -> {
                    JsonNode content = entry.getValue().path("contentStr");
                    if (content.isTextual()) {
                        String cleaned = content.asText().replaceAll("<.*?>", "");
                        effects.add(cleaned);
                    }
                });
                dto.setElixirEffects(effects);
            }

            // 품질
            JsonNode qualityNode = tooltipJson.path("Element_001").path("value").path("qualityValue");
            if (qualityNode.isInt()) {
                dto.setQuality(qualityNode.intValue());
            }

            //디버깅용.  콘솔 엄청 기니까 나중에 삭제 ㄱ
            System.out.println("강화단계: " + dto.getRefinementLevel());
            System.out.println("초월단계: " + dto.getTranscendenceLevel());
            System.out.println("엘릭서이름: " + dto.getElixirName());
            System.out.println("엘릭서효과: " + dto.getElixirEffects());


        } catch (Exception e) {
            System.err.println("Tooltip parsing failed: " + e.getMessage());
        }
    }
}
