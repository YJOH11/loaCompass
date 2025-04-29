package com.finalteam.loacompass.controller;

import com.finalteam.loacompass.service.LostArkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")

public class LostArkController {

    @Autowired
    private LostArkService lostArkService;

    @GetMapping("/character/{name}")
    public String getCharacter(@PathVariable String name) {
        return lostArkService.getCharacterInfo(name);
    }
}
