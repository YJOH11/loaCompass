package com.finalteam.loacompass.clearrecord.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PartyMemberDto {
    private String characterName;
    private String job;
    private int level;
}