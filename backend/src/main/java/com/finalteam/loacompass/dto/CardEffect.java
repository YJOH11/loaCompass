package com.finalteam.loacompass.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class CardEffect {

    private int index;

    @JsonProperty("CardSlots")
    private List<Integer> cardSlots;

    @JsonProperty("Items")
    private List<CardEffectItem> items;
}
