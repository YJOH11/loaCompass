package com.finalteam.loacompass.crawling.client;

import com.finalteam.loacompass.crawling.dto.MariShopResponseDto;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class FlaskMariShopClient {

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String FLASK_URL = "http://localhost:5000/api/shop-mari";

    public MariShopResponseDto fetchMariShop() {
        return restTemplate.getForObject(FLASK_URL, MariShopResponseDto.class);
    }
}