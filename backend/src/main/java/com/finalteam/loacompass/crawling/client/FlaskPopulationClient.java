package com.finalteam.loacompass.crawling.client;

import com.finalteam.loacompass.crawling.dto.PopulationCrawlDto;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Component
public class FlaskPopulationClient {

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String FLASK_URL = "http://localhost:5000/api/population";

    public List<PopulationCrawlDto> fetchPopulation() {
        ResponseEntity<Map<String, List<PopulationCrawlDto>>> response =
                restTemplate.exchange(
                        FLASK_URL,
                        HttpMethod.GET,
                        null,
                        new ParameterizedTypeReference<>() {}
                );

        return response.getBody().get("KR");
    }
}
