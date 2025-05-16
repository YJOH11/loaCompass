package com.finalteam.loacompass.population.service;

import com.finalteam.loacompass.dto.CharacterSummaryDto;
import com.finalteam.loacompass.population.entity.FailedNickname;
import com.finalteam.loacompass.population.repository.FailedNicknameRepository;
import com.finalteam.loacompass.service.CharacterService;
import com.finalteam.loacompass.util.NicknameGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@RequiredArgsConstructor
@Service
public class NicknameCollectorService {

    private final CharacterService characterService;
    private final FailedNicknameRepository failedNicknameRepository;

    public void collectRandom(int count) {
        int safeCount = Math.min(count, 100);

        for (int i = 0; i < safeCount; i++) {
            String nickname = NicknameGenerator.generatePatternedRandomLength();

            //  이미 실패한 닉네임이면 skip
            if (failedNicknameRepository.existsByNickname(nickname)) {
                continue;
            }

            try {
                CharacterSummaryDto dto = characterService.getCharacterAuto(nickname);

                if (dto != null) {
                    System.out.println("!!!!!!! 저장 성공: " + nickname + " | 서버: " +
                            dto.getProfile().getServerName() + " | 레벨: " + dto.getProfile().getItemAvgLevel());
                } else {
                    //  실패 기록 저장
                    failedNicknameRepository.save(
                            FailedNickname.builder()
                                    .nickname(nickname)
                                    .lastTriedAt(LocalDate.now())
                                    .build()
                    );
                    System.out.println(" 존재하지 않음 or 조건 미달: " + nickname);
                }

                Thread.sleep(700); // 안전한 요청 간격 (0.7초 간격 = 분당 약 85회)

            } catch (Exception e) {
                System.out.println(" 오류 발생: " + nickname + " → " + e.getMessage());
            }
        }
    }
}
