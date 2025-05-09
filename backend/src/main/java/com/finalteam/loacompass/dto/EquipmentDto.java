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

    // 장비 전용 필드
    private Integer refinementLevel;      // 연마 단계
    private Integer transcendenceLevel;   // 초월 단계
    private Integer transcendencePoint;   // 초월 포인트
    private String elixirName;            // 엘릭서 이름
    private List<String> elixirEffects;   // 엘릭서 효과
    private List<ElixirOptionDto> elixirOptions; // 엘릭서 옵션
    private String additionalEffect;      // 무기 추가 효과, 팔찌 아크패시브 등

    // 악세서리 전용 필드
    private String basicEffect;                  // 기본 능력치
    private List<String> refinementEffects;      // 연마 효과
    private String arcPassiveEffect;             // 아크 패시브

    // 어빌리티 스톤 전용 필드
    private List<String> abilityStoneEngravings; // 각인 효과

    // 팔찌 전용 필드
    private List<String> braceletEffects;        // 팔찌 옵션 리스트

}

