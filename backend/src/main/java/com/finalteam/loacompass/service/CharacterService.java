package com.finalteam.loacompass.service;

import com.finalteam.loacompass.client.LostArkClient;
import com.finalteam.loacompass.dto.CharacterProfileDto;
import com.finalteam.loacompass.dto.CharacterSummaryDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CharacterService {

    private final LostArkClient lostArkClient;

    public CharacterSummaryDto getCharacter(String nickname) {
        CharacterProfileDto profile = lostArkClient.getCharacterProfile(nickname);

        CharacterSummaryDto summary = new CharacterSummaryDto();
        summary.setProfile(profile);


        return summary;
    }
}
