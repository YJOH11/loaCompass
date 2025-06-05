package com.finalteam.loacompass.clearrecord.dto;

import lombok.Data;

import java.util.List;

@Data
public class ClearRecordRequest {
    private String boss;
    private String difficulty;
    private String clearTime;
    private String guildName;
    private List<PartyMemberDto> party1;
    private List<PartyMemberDto> party2;
}

