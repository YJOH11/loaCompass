package com.finalteam.loacompass.dto;

import lombok.Data;

import java.util.List;

@Data
public class AbilityStoneDto {
    private String type;
    private String name;
    private String icon;
    private String grade;

    private String basicEffect;       // 체력 +23481
    private String bonusEffect;       // 체력 +1175
    private List<String> engravings;  // 각인 목록 ["구슬동자 Lv.2", "각성 Lv.2", "방어력 감소 Lv.0"]
}
