package com.finalteam.loacompass.service;

import com.finalteam.loacompass.client.LostArkClient;
import com.finalteam.loacompass.dto.CharacterSummaryDto;
import com.finalteam.loacompass.population.entity.CharacterRecord;
import com.finalteam.loacompass.population.entity.RecordSourceType;
import com.finalteam.loacompass.population.repository.CharacterRecordRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
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

        boolean exists = characterRecordRepository.existsByCharacterNameAndItemLevelAndServerNameAndCharacterClass(
                nickname, itemLevel, server, clazz
        );

        if (!exists && itemLevel >= 1640f) {
            // 신규 저장
            characterRecordRepository.save(CharacterRecord.builder()
                    .characterName(nickname)
                    .serverName(server)
                    .characterClass(clazz)
                    .itemLevel(itemLevel)
                    .characterImage(dto.getProfile().getCharacterImage())
                    .recordedAt(LocalDateTime.now())
                    .source(source)
                    .build());
            log.info(" 캐릭터 저장됨: {}", nickname);
        } else if (exists) {
            // 이미 저장돼 있지만 이미지가 누락된 경우 → 보충 업데이트
            characterRecordRepository.findTopByCharacterNameOrderByRecordedAtDesc(nickname)
                    .filter(r -> r.getCharacterImage() == null || r.getCharacterImage().isBlank())
                    .ifPresent(r -> {
                        r.setCharacterImage(dto.getProfile().getCharacterImage());
                        characterRecordRepository.save(r);
                        log.info("♻️ 캐릭터 이미지만 업데이트됨: {}", nickname);
                    });
        }
    }

    private float parseItemLevel(String levelStr) {
        try {
            return Float.parseFloat(levelStr.replace(",", ""));
        } catch (NumberFormatException e) {
            log.warn(" 아이템 레벨 파싱 실패: {}", levelStr);
            return 0f;
        }
    }
}
