package com.finalteam.loacompass.clearrecord.dto;

import java.util.List;

public class ClearSubmitDto {
    private String boss;
    private String difficulty;
    private String clearTime;
    private String guildName; // optional
    private List<PartyMemberDto> party1;
    private List<PartyMemberDto> party2;
}
