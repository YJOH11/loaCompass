package com.finalteam.loacompass.crawling.controller;

import com.finalteam.loacompass.crawling.client.FlaskMariShopClient;
import com.finalteam.loacompass.crawling.dto.MariShopResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class MariShopProxyController {

    private final FlaskMariShopClient flaskClient;

    public MariShopProxyController(FlaskMariShopClient flaskClient) {
        this.flaskClient = flaskClient;
    }

    @GetMapping("/shop")
    public ResponseEntity<MariShopResponseDto> getMariShop() {
        MariShopResponseDto response = flaskClient.fetchMariShop();
        return ResponseEntity.ok(response);
    }
}
