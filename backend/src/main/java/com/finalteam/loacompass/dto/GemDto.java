package com.finalteam.loacompass.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class GemDto {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("Icon")
    private String icon;

    @JsonProperty("Grade")
    private String grade;

    @JsonProperty("Level")
    private int level;

    @JsonProperty("Tooltip")
    private String tooltip;


    private String gemType;       // 보석 종류(멸화, 홍염, 겁화, 작열...)
    private String effect;        // 효과 증가 %
    private String skillName;     // 스킬명
}