package com.finalteam.loacompass.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Map;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)

public class CharacterProfileDto {
    private String characterName;
    private String characterClassName;
    private int characterLevel;
    private String itemAvgLevel;
    private String itemMaxLevel;
    private String serverName;
    private String characterImage;

    private int expeditionLevel;
    private String guildName;
    private String guildMemberGrade;
    private String title;
    private String pvpGradeName;
    private int townLevel;
    private String townName;

    private Map<String, Integer> combatStats;  // 치명, 특화 등
    private Map<String, Integer> socialStats;  // 지성, 담력 등
}
