package com.finalteam.loacompass.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ArkPassiveEffect {

    @JsonProperty("Name")
    private String name;

    @JsonProperty("Grade")
    private String grade;

    @JsonProperty("Level")
    private int level;

    @JsonProperty("Description")
    private String description;

    // 혹시 필요하다면
    @JsonProperty("AbilityStoneLevel")
    private Integer abilityStoneLevel;
}

