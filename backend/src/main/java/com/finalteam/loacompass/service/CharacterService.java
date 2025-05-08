package com.finalteam.loacompass.service;

import com.finalteam.loacompass.client.LostArkClient;
import com.finalteam.loacompass.dto.CharacterProfileDto;
import com.finalteam.loacompass.dto.CharacterSummaryDto;
import com.finalteam.loacompass.dto.EquipmentDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CharacterService {

    private final LostArkClient lostArkClient;

    public CharacterSummaryDto getCharacter(String nickname) {
        return lostArkClient.getCharacterSummary(nickname);
    }

}
