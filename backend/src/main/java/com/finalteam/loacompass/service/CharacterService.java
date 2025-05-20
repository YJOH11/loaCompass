package com.finalteam.loacompass.service;

import com.finalteam.loacompass.client.LostArkClient;
import com.finalteam.loacompass.dto.CharacterSummaryDto;
import com.finalteam.loacompass.population.entity.CharacterRecord;
import com.finalteam.loacompass.population.entity.RecordSourceType;
import com.finalteam.loacompass.population.repository.CharacterRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class CharacterService {

    private final LostArkClient lostArkClient;
    private final CharacterRecordRepository characterRecordRepository;

    public CharacterSummaryDto getCharacter(String nickname) {
        CharacterSummaryDto dto = lostArkClient.getCharacterSummary(nickname);
        if (dto == null || dto.getProfile() == null) return null;

        float itemLevel = parseItemLevel(dto.getProfile().getItemAvgLevel());
        LocalDate today = LocalDate.now();

        boolean exists = characterRecordRepository.existsByCharacterNameAndRecordedAt(nickname, today);
        if (!exists && itemLevel >= 1640f) {
            CharacterRecord record = CharacterRecord.builder()
                    .characterName(dto.getProfile().getCharacterName())
                    .serverName(dto.getProfile().getServerName())
                    .characterClass(dto.getProfile().getCharacterClassName())
                    .itemLevel(itemLevel)
                    .recordedAt(today)
                    .source(RecordSourceType.SEARCHED)
                    .build();

            characterRecordRepository.save(record);
        }

        return dto;
    }

    public CharacterSummaryDto getCharacterAuto(String nickname) {
        CharacterSummaryDto dto = lostArkClient.getCharacterSummary(nickname);
        if (dto == null || dto.getProfile() == null) return null;

        float itemLevel = parseItemLevel(dto.getProfile().getItemAvgLevel());
        if (itemLevel < 1640f) return null;

        LocalDate today = LocalDate.now();
        boolean exists = characterRecordRepository.existsByCharacterNameAndRecordedAt(nickname, today);
        if (!exists) {
            CharacterRecord record = CharacterRecord.builder()
                    .characterName(dto.getProfile().getCharacterName())
                    .serverName(dto.getProfile().getServerName())
                    .characterClass(dto.getProfile().getCharacterClassName())
                    .itemLevel(itemLevel)
                    .recordedAt(today)
                    .source(RecordSourceType.AUTO)
                    .build();

            characterRecordRepository.save(record);
        }

        return dto;
    }

    private float parseItemLevel(String levelStr) {
        try {
            return Float.parseFloat(levelStr.replace(",", ""));
        } catch (NumberFormatException e) {
            return 0f;
        }
    }
}
