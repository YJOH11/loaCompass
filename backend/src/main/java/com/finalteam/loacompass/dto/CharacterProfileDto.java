package com.finalteam.loacompass.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CharacterProfileDto {

    @JsonProperty("CharacterName")
    private String characterName;

    @JsonProperty("CharacterClassName")
    private String characterClassName;

    @JsonProperty("ItemAvgLevel")
    private String itemAvgLevel;

    @JsonProperty("ItemMaxLevel")
    private String itemMaxLevel;

    @JsonProperty("CharacterLevel")
    private int characterLevel;

    @JsonProperty("ServerName")
    private String serverName;
}
