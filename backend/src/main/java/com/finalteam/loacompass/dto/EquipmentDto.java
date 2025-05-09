package com.finalteam.loacompass.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data

public class EquipmentDto {

    // 공통 필드
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

    private Integer quality; // 품질
    private String acquisitionInfo; // 획득처

    // 장비 전용
    private Integer refinementLevel;
    private Integer transcendenceLevel;
    private Integer transcendencePoint;
    private String elixirName;
    private List<String> elixirEffects;
    private List<ElixirOptionDto> elixirOptions;
    private String additionalEffect; // 무기 특수 효과 등

    // 악세서리 전용
    private String basicEffect;
    private String refinementEffect;
    private String arcPassiveEffect;

    // 어빌리티 스톤 전용
    private List<String> abilityStoneEngravings;



}
