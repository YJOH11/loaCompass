package com.finalteam.loacompass.clearrecord.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JobTierDto {
    private String job;
    private int tier;
    private int count;
    private int averageClearTimeInSeconds;
    private String formattedTime;
    private String iconUrl;
}
