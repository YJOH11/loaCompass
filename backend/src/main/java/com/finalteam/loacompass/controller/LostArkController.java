package com.finalteam.loacompass.controller;

import com.finalteam.loacompass.dto.CharacterSummaryDto;
import com.finalteam.loacompass.service.LostArkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")

public class LostArkController {

    @Autowired
    private LostArkService lostArkService;

    @GetMapping("/{characterName}")
    public ResponseEntity<CharacterSummaryDto> getCharacter(@PathVariable String characterName) {
        CharacterSummaryDto dto = lostArkService.getCharacterSummary(characterName);
        return ResponseEntity.ok(dto);
    }
}
