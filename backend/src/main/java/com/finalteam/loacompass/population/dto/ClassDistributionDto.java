package com.finalteam.loacompass.population.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ClassDistributionDto {
    private String characterClass;
    private Long count;
}