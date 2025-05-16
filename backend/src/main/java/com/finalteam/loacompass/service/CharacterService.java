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
        // 1. API 통해 캐릭터 정보 가져오기
        CharacterSummaryDto dto = lostArkClient.getCharacterSummary(nickname);

        // 2. 아이템 레벨 파싱
        float itemLevel = parseItemLevel(dto.getProfile().getItemAvgLevel());
        LocalDate today = LocalDate.now();

        // 3. 중복 방지 + 조건 필터링 (1640 이상만 저장)
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

        // 4. 결과 반환
        return dto;
    }

    private float parseItemLevel(String levelStr) {
        return Float.parseFloat(levelStr.replace(",", ""));
    }
}
