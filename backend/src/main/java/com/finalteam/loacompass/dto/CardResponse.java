package com.finalteam.loacompass.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class CardResponse {
    @JsonProperty("Cards")
    private List<CardDto> cards;

    @JsonProperty("Effects")
    private List<CardEffect> effects;
}
