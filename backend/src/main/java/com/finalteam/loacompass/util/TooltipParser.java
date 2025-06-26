package com.finalteam.loacompass.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.finalteam.loacompass.dto.ElixirOptionDto;
import com.finalteam.loacompass.dto.EquipmentDto;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
public class TooltipParser {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static void populateEquipmentDetails(EquipmentDto dto) {
        try {
            JsonNode tooltipJson = parseTooltip(dto.getTooltip());

            // 강화 단계
            JsonNode refinementNode = tooltipJson.path("Element_005").path("value");
            if (refinementNode.isTextual()) {
                String cleaned = refinementNode.asText().replaceAll("<.*?>", "");
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
                Matcher levelMatcher = Pattern.compile("초월.*?(\\d+)단계").matcher(topStr);
                if (levelMatcher.find()) {
                    dto.setTranscendenceLevel(Integer.parseInt(levelMatcher.group(1)));
                }
                Matcher pointMatcher = Pattern.compile("img[^>]*>(\\d+)").matcher(topStr);
                if (pointMatcher.find()) {
                    dto.setTranscendencePoint(Integer.parseInt(pointMatcher.group(1)));
                }
            }

            // 엘릭서 이름
            JsonNode elixirNode = tooltipJson.path("Element_009").path("value").path("Element_000");
            if (elixirNode != null && elixirNode.has("topStr")) {
                String elixirName = Jsoup.parse(elixirNode.path("topStr").asText()).text();
                dto.setElixirName(elixirName);
            }

            // 엘릭서 효과 및 옵션
            List<String> elixirEffects = new ArrayList<>();
            List<ElixirOptionDto> elixirOptions = new ArrayList<>();
            JsonNode elixirContentGroup = elixirNode.path("contentStr");
            if (elixirContentGroup != null && elixirContentGroup.isObject()) {
                elixirContentGroup.fields().forEachRemaining(entry -> {
                    JsonNode contentStr = entry.getValue().path("contentStr");
                    if (contentStr.isTextual()) {
                        String raw = Jsoup.parse(contentStr.asText()).text();
                        elixirEffects.add(raw);
                        Matcher matcher = Pattern.compile("\\[(.*?)\\]\\s*(.*?)\\s*Lv\\.(\\d+)").matcher(raw);
                        if (matcher.find()) {
                            String name = matcher.group(2).trim();
                            int level = Integer.parseInt(matcher.group(3));
                            ElixirOptionDto opt = new ElixirOptionDto();
                            opt.setName(name);
                            opt.setLevel(level);
                            elixirOptions.add(opt);
                        }
                    }
                });
            }

            // 연성 효과 (Element_010)
            JsonNode optionGroup = tooltipJson.path("Element_010").path("value").path("Element_000").path("contentStr");
            if (optionGroup != null && optionGroup.isObject()) {
                optionGroup.fields().forEachRemaining(entry -> {
                    JsonNode content = entry.getValue().path("contentStr");
                    if (content.isTextual()) {
                        String text = Jsoup.parse(content.asText()).text().trim();
                        Matcher matcher = Pattern.compile("]\\s*(.*?)\\s*Lv\\.(\\d+)").matcher(text);
                        if (matcher.find()) {
                            String name = matcher.group(1).trim();
                            int level = Integer.parseInt(matcher.group(2));
                            ElixirOptionDto opt = new ElixirOptionDto();
                            opt.setName(name);
                            opt.setLevel(level);
                            elixirOptions.add(opt);
                        }
                    }
                });
            }

            dto.setElixirOptions(elixirOptions);
            dto.setElixirEffects(elixirEffects);

        } catch (Exception e) {
            System.err.println("Tooltip parsing failed: " + e.getMessage());
        }
    }

    public static void populateGeneralDetails(EquipmentDto dto) {
        try {
            JsonNode root = parseTooltip(dto.getTooltip());

            JsonNode qualityNode = root.path("Element_001").path("value").path("qualityValue");
            if (!qualityNode.isMissingNode() && qualityNode.isInt()) {
                dto.setQuality(qualityNode.asInt());
            }

            JsonNode basicEffectNode = root.path("Element_004").path("value").path("Element_001");
            if (!basicEffectNode.isMissingNode()) {
                String basicEffect = Jsoup.parse(basicEffectNode.asText().replace("<BR>", "\n")).text();
                dto.setBasicEffect(basicEffect);
            }

            JsonNode refinementNode = root.path("Element_005").path("value").path("Element_001");
            if (!refinementNode.isMissingNode()) {
                String html = refinementNode.asText();
                String[] lines = html.split("(?i)<br\\s*/?>");
                List<String> effects = new ArrayList<>();
                for (String line : lines) {
                    String cleaned = Jsoup.parse(line).text().trim();
                    if (!cleaned.isEmpty()) {
                        effects.add(cleaned);
                    }
                }
                dto.setRefinementEffects(effects);
            }

            JsonNode effectNode = root.path("Element_007").path("value").path("Element_001");
            if (!effectNode.isMissingNode()) {
                String effectText = Jsoup.parse(effectNode.asText()).text();
                if (dto.getType().equals("목걸이") || dto.getType().equals("귀걸이") || dto.getType().equals("반지")) {
                    dto.setArcPassiveEffect(effectText);
                } else {
                    dto.setAdditionalEffect(effectText);
                }
            }

            JsonNode acquisitionNode = root.path("Element_008").path("value");
            if (!acquisitionNode.isMissingNode()) {
                String acquisition = Jsoup.parse(acquisitionNode.asText().replace("<BR>", "\n")).text();
                dto.setAcquisitionInfo(acquisition);
            }

        } catch (Exception e) {
            log.warn("Tooltip 공통 정보 파싱 실패 [{}]: {}", dto.getName(), e.getMessage());
        }
    }

    public static void populateAbilityStoneDetails(EquipmentDto dto) {
        try {
            JsonNode root = parseTooltip(dto.getTooltip());
            JsonNode engravingGroup = root.path("Element_006").path("value").path("Element_000").path("contentStr");
            if (engravingGroup != null && engravingGroup.isObject()) {
                List<String> engravings = new ArrayList<>();
                engravingGroup.fields().forEachRemaining(entry -> {
                    JsonNode content = entry.getValue().path("contentStr");
                    if (content.isTextual()) {
                        String cleaned = Jsoup.parse(content.asText()).text();
                        engravings.add(cleaned);
                    }
                });
                dto.setAbilityStoneEngravings(engravings);
            }
        } catch (Exception e) {
            log.warn("AbilityStone 파싱 실패 [{}]: {}", dto.getName(), e.getMessage());
        }
    }

    public static void populateBraceletDetails(EquipmentDto dto) {
        try {
            JsonNode root = parseTooltip(dto.getTooltip());
            JsonNode braceletEffectNode = root.path("Element_004").path("value").path("Element_001");
            if (braceletEffectNode.isTextual()) {
                String html = braceletEffectNode.asText();
                String[] rawLines = html.split("<BR>");
                List<String> effects = new ArrayList<>();
                for (int i = 0; i < rawLines.length; i++) {
                    String cleaned = Jsoup.parse(rawLines[i]).text().trim();
                    if (!cleaned.isEmpty()) {
                        if (cleaned.startsWith("각성기는") && !effects.isEmpty()) {
                            String prev = effects.remove(effects.size() - 1);
                            effects.add(prev + " " + cleaned);
                        } else {
                            effects.add(cleaned);
                        }
                    }
                }
                dto.setBraceletEffects(effects);
            }
        } catch (Exception e) {
            log.warn("Bracelet 파싱 실패 [{}]: {}", dto.getName(), e.getMessage());
        }
    }

    private static JsonNode parseTooltip(String rawTooltip) throws Exception {
        JsonNode node = objectMapper.readTree(rawTooltip);
        if (node.isTextual()) {
            node = objectMapper.readTree(node.asText());
        }
        return node;
    }
}
