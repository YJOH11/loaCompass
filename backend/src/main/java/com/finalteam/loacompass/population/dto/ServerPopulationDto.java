package com.finalteam.loacompass.population.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ServerPopulationDto {
    private String serverName;
    private long count;
}
