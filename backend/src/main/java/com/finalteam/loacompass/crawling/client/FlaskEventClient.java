package com.finalteam.loacompass.crawling.client;

import com.finalteam.loacompass.crawling.dto.EventDto;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpMethod;

import java.util.List;

@Component
public class FlaskEventClient {

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String FLASK_EVENT_URL = "http://localhost:5000/api/events";

    public List<EventDto> fetchEvents() {
        ResponseEntity<List<EventDto>> response = restTemplate.exchange(
                FLASK_EVENT_URL,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<EventDto>>() {}
        );
        return response.getBody();
    }
}
