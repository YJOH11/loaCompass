package com.finalteam.loacompass.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CardEffectItem {
    @JsonProperty("Name")
    private String name;

    @JsonProperty("Description")
    private String description;
}