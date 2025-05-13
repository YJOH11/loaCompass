package com.finalteam.loacompass.util;

import com.finalteam.loacompass.dto.ArkPassiveEffect;
import com.finalteam.loacompass.dto.EngravingDto;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class EngravingParser {

    public static List<EngravingDto> parse(List<ArkPassiveEffect> arkPassiveEffects) {
        if (arkPassiveEffects == null || arkPassiveEffects.isEmpty()) return List.of();

        return arkPassiveEffects.stream()
                .map(effect -> new EngravingDto(
                        effect.getName(),
                        effect.getGrade(),
                        "Lv." + effect.getLevel()
                ))
                .collect(Collectors.toList());
    }
    }