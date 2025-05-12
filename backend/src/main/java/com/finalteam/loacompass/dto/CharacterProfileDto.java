package com.finalteam.loacompass.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Map;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CharacterProfileDto {

    @JsonProperty("CharacterName")
    private String characterName;

    @JsonProperty("CharacterClassName")
    private String characterClassName;

    @JsonProperty("CharacterLevel")
    private int characterLevel;

    @JsonProperty("ItemAvgLevel")
    private String itemAvgLevel;

    @JsonProperty("ItemMaxLevel")
    private String itemMaxLevel;

    @JsonProperty("ServerName")
    private String serverName;

    @JsonProperty("CharacterImage")
    private String characterImage;

    @JsonProperty("ExpeditionLevel")
    private int expeditionLevel;

    @JsonProperty("GuildName")
    private String guildName;

    @JsonProperty("GuildMemberGrade")
    private String guildMemberGrade;

    @JsonProperty("Title")
    private String title;

    @JsonProperty("PvpGradeName")
    private String pvpGradeName;

    @JsonProperty("TownLevel")
    private int townLevel;

    @JsonProperty("TownName")
    private String townName;

    @JsonInclude(JsonInclude.Include.ALWAYS)
    @JsonProperty("cardSet")
    private CardSetDto cardSet;


}
