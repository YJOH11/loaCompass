//package com.finalteam.loacompass.controller;
//
//import com.finalteam.loacompass.dto.EventDto;
//import com.finalteam.loacompass.service.EventService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/events")
//public class EventController {
//
//    @Autowired
//    private EventService eventService;
//
//    @GetMapping
//    public ResponseEntity<List<EventDto>> getEvents() {
//        return ResponseEntity.ok(eventService.getEvents());
//    }
//}