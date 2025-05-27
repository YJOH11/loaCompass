package com.finalteam.loacompass.service;

import com.finalteam.loacompass.client.LostArkClient;
import com.finalteam.loacompass.dto.CharacterSummaryDto;
import com.finalteam.loacompass.population.entity.CharacterRecord;
import com.finalteam.loacompass.population.entity.RecordSourceType;
import com.finalteam.loacompass.population.repository.CharacterRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CharacterService {

    private final LostArkClient lostArkClient;
    private final CharacterRecordRepository characterRecordRepository;

    public CharacterSummaryDto getCharacter(String nickname) {
        CharacterSummaryDto dto = lostArkClient.getCharacterSummary(nickname);
        if (dto == null || dto.getProfile() == null) return null;

        insertIfNotExists(dto, RecordSourceType.SEARCHED);
        return dto;
    }

    public CharacterSummaryDto getCharacterAuto(String nickname) {
        CharacterSummaryDto dto = lostArkClient.getCharacterSummary(nickname);
        if (dto == null || dto.getProfile() == null) return null;

        float itemLevel = parseItemLevel(dto.getProfile().getItemAvgLevel());
        if (itemLevel < 1640f) return null;

        insertIfNotExists(dto, RecordSourceType.AUTO);
        return dto;
    }

    private void insertIfNotExists(CharacterSummaryDto dto, RecordSourceType source) {
        String nickname = dto.getProfile().getCharacterName();
        String server = dto.getProfile().getServerName();
        String clazz = dto.getProfile().getCharacterClassName();
        float itemLevel = parseItemLevel(dto.getProfile().getItemAvgLevel());

        boolean exists = characterRecordRepository.existsExactRecord(nickname, itemLevel, server, clazz);
        if (!exists && itemLevel >= 1640f) {
            CharacterRecord record = CharacterRecord.builder()
                    .characterName(nickname)
                    .serverName(server)
                    .characterClass(clazz)
                    .itemLevel(itemLevel)
                    .recordedAt(LocalDateTime.now())
                    .source(source)
                    .build();

            characterRecordRepository.save(record);
        }
    }

    private float parseItemLevel(String levelStr) {
        try {
            return Float.parseFloat(levelStr.replace(",", ""));
        } catch (NumberFormatException e) {
            return 0f;
        }
    }
}
