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
                Matcher matcher = Pattern.compile("(\\d+)단계").matcher(refinementNode.asText());
                if (matcher.find()) {
                    dto.setRefinementLevel(Integer.parseInt(matcher.group(1)));
                }
            }

            // 초월 단계
            JsonNode transcendenceNode = tooltipJson.path("Element_009").path("value")
                    .path("Element_000").path("topStr");
            if (transcendenceNode.isTextual()) {
                Matcher matcher = Pattern.compile("초월.*?(\\d+)").matcher(transcendenceNode.asText());
                if (matcher.find()) {
                    dto.setTranscendenceLevel(Integer.parseInt(matcher.group(1)));
                }
            }

            // 엘릭서 이름
            JsonNode elixirRoot = tooltipJson.path("Element_010").path("value");
            if (elixirRoot != null && elixirRoot.has("Element_000")) {
                JsonNode topStrNode = elixirRoot.path("Element_000").path("topStr");
                if (topStrNode.isTextual()) {
                    String topStr = topStrNode.asText().replaceAll("<.*?>", "");
                    Matcher matcher = Pattern.compile("엘릭서\\s*(.*)").matcher(topStr);
                    if (matcher.find()) {
                        dto.setElixirName(matcher.group(1).trim());
                    }
                }
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
