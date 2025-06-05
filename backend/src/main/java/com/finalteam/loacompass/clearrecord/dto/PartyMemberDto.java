package com.finalteam.loacompass.clearrecord.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PartyMemberDto {
    private String characterName;
    private String job;
    private int level;
}