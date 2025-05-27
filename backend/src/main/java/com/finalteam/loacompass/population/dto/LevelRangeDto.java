package com.finalteam.loacompass.population.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LevelRangeDto {
    private String serverName;
    private String levelRange;  // ex: "1650-1660"
    private long count;
}
