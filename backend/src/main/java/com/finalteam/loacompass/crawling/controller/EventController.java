package com.finalteam.loacompass.crawling.controller;

import com.finalteam.loacompass.crawling.client.FlaskEventClient;
import com.finalteam.loacompass.crawling.dto.EventDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final FlaskEventClient flaskEventClient;

    @Autowired
    public EventController(FlaskEventClient flaskEventClient) {
        this.flaskEventClient = flaskEventClient;
    }

    @GetMapping
    public ResponseEntity<List<EventDto>> getEvents() {
        return ResponseEntity.ok(flaskEventClient.fetchEvents());
    }
}

