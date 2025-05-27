package com.finalteam.loacompass.population.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ServerClassDistributionDto {
    private String serverName;
    private String characterClass;
    private long count;
}