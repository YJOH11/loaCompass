package com.finalteam.loacompass.controller;

import com.finalteam.loacompass.dto.CharacterProfileDto;
import com.finalteam.loacompass.service.CharacterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/characters")
@RequiredArgsConstructor
public class CharacterController {
    private final CharacterService characterService;

    @GetMapping("/{nickname}")
    public CharacterProfileDto search(@PathVariable String nickname) {
        return characterService.getCharacter(nickname);
    }
}
