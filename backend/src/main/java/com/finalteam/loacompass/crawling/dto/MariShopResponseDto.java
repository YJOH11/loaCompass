package com.finalteam.loacompass.crawling.dto;

import java.util.List;

public class MariShopResponseDto {

    private String remainTime;
    private List<MariShopItemDto> items;

    public String getRemainTime() {
        return remainTime;
    }

    public void setRemainTime(String remainTime) {
        this.remainTime = remainTime;
    }

    public List<MariShopItemDto> getItems() {
        return items;
    }

    public void setItems(List<MariShopItemDto> items) {
        this.items = items;
    }
}