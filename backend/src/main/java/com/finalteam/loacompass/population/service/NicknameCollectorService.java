package com.finalteam.loacompass.population.service;

import com.finalteam.loacompass.dto.CharacterSummaryDto;
import com.finalteam.loacompass.population.entity.FailedNickname;
import com.finalteam.loacompass.population.repository.FailedNicknameRepository;
import com.finalteam.loacompass.service.CharacterService;
import com.finalteam.loacompass.util.NicknameGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.Random;

@RequiredArgsConstructor
@Service
public class NicknameCollectorService {

    private final CharacterService characterService;
    private final FailedNicknameRepository failedNicknameRepository;
    private final RestTemplate restTemplate;
    private final Random random = new Random();

    public void collectRandom(int count) {
        int safeCount = Math.min(count, 100);

        for (int i = 0; i < safeCount; i++) {
            String nickname;

            // 길이를 2~4 사이에서 무작위 선택 → 닉네임 길이 다양화
            int ngramLength = 2 + random.nextInt(3); // 2 ~ 4

            try {
                String[] response = restTemplate.getForObject(
                        "http://localhost:5000/api/nickname/ngram?count=1&length=" + ngramLength,
                        String[].class
                );
                nickname = (response != null && response.length > 0) ? response[0] : null;
            } catch (Exception e) {
                System.out.println("Flask 호출 실패, fallback 사용 → " + e.getMessage());
                nickname = NicknameGenerator.generateRealisticNickname();
            }

            if (nickname == null || failedNicknameRepository.existsByNickname(nickname)) {
                continue;
            }

            try {
                CharacterSummaryDto dto = characterService.getCharacterAuto(nickname);

                if (dto != null) {
                    System.out.println("!!!!!!! 저장 성공: " + nickname + " | 서버: " +
                            dto.getProfile().getServerName() + " | 레벨: " + dto.getProfile().getItemAvgLevel());
                } else {
                    // 실패 기록 저장
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
