package com.finalteam.loacompass.population.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TopCharacterDto {
    private String characterName;
    private float itemLevel;
    private String characterClass;
    private String serverName;
    private String characterImage;
}
