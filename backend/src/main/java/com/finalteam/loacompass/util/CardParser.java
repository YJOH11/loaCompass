package com.finalteam.loacompass.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.finalteam.loacompass.dto.CardEffect;
import com.finalteam.loacompass.dto.CardEffectItem;
import com.finalteam.loacompass.dto.CardResponse;
import com.finalteam.loacompass.dto.CardSetDto;

import java.util.List;

public class CardParser {

    public static CardSetDto extractActiveCardSet(CardResponse cardResponse) {
        List<CardEffect> effects = cardResponse.getEffects();
        if (effects == null || effects.isEmpty()) return null;

        for (CardEffect effect : effects) {
            List<CardEffectItem> items = effect.getItems();
            if (items != null && !items.isEmpty()) {
                CardEffectItem last = items.get(items.size() - 1);
                return new CardSetDto(last.getName(), last.getDescription());
            }
        }

        return null;
    }

}
