package com.finalteam.loacompass.service;

import com.finalteam.loacompass.client.LostArkClient;
import com.finalteam.loacompass.dto.CharacterProfileDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CharacterService {
    private final LostArkClient lostArkClient;

    public CharacterProfileDto getCharacter(String nickname) {
        return lostArkClient.getCharacterProfile(nickname);
    }
}
