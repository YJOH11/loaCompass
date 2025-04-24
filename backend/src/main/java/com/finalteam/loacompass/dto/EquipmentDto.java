package com.finalteam.loacompass.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data

public class EquipmentDto {

    @JsonProperty("Type")
    private String type;

    @JsonProperty("Name")
    private String name;

    @JsonProperty("Icon")
    private String icon;

    @JsonProperty("Grade")
    private String grade;

    @JsonProperty("Tooltip")
    private String tooltip;

    private Integer refinementLevel;         // 강화 단계
    private Integer transcendenceLevel;      // 초월 단계
    private String elixirName;               // 엘릭서 이름
    private List<String> elixirEffects;      // 엘릭서 효과

}
