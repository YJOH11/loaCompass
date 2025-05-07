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
    private List<ElixirOptionDto> elixirOptions;  // 옵션 이름만 저장
    private Integer quality;            // 품질
    private Integer transcendencePoint;  // 장비별 초월 포인트

    // 악세서리
    private String basicEffect;           // 기본 능력치
    private String refinementEffect;      // 연마 효과
    private String arcPassiveEffect;      // 아크 패시브 효과
    private String acquisitionInfo;       // 획득처



}
