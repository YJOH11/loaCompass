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
        CharacterProfileDto profile = lostArkClient.getCharacterProfile(nickname);
        List<EquipmentDto> equipmentList = lostArkClient.getCharacterEquipment(nickname);

        CharacterSummaryDto summary = new CharacterSummaryDto();
        summary.setProfile(profile);
        summary.setEquipments(equipmentList);


        return summary;
    }
}
