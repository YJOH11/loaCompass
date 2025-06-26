package com.finalteam.loacompass.dto;

import lombok.Data;

import java.util.List;

@Data
public class BraceletDto {
    private String type;
    private String name;
    private String icon;
    private String grade;

    private List<String> effects;         // 효과 ["힘 +10752", "치명타 피해 저항 -4.8%", ...]
    private String arcPassiveEffect;      // ex) 도약 +18
}
