package com.finalteam.loacompass.clearrecord.service;

import com.finalteam.loacompass.clearrecord.dto.ClearRecordDto;
import com.finalteam.loacompass.clearrecord.dto.ClearRecordRequest;
import com.finalteam.loacompass.clearrecord.dto.JobTierDto;
import com.finalteam.loacompass.clearrecord.entity.ClearPartyMember;
import com.finalteam.loacompass.clearrecord.entity.ClearRecord;
import com.finalteam.loacompass.clearrecord.repository.ClearRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class ClearRecordService {

    private final ClearRecordRepository clearRecordRepository;

    public void saveClearRecord(ClearRecordRequest request, MultipartFile screenshot) {
        ClearRecord record = ClearRecord.builder()
                .boss(request.getBoss())
                .difficulty(request.getDifficulty())
                .clearTime(request.getClearTime())
                .guildName(request.getGuildName()) // 변경: raidName → guildName
                .submittedAt(LocalDateTime.now()) // 변경: recordedAt → submittedAt
                .build();

        // 1파티 구성
        List<ClearPartyMember> members1 = request.getParty1().stream()
                .map(dto -> ClearPartyMember.builder()
                        .characterName(dto.getCharacterName())
                        .job(dto.getJob())
                        .itemLevel(dto.getLevel())
                        .partyNumber(1)
                        .clearRecord(record)
                        .build())
                .toList();

        // 2파티 구성
        List<ClearPartyMember> members2 = request.getParty2().stream()
                .map(dto -> ClearPartyMember.builder()
                        .characterName(dto.getCharacterName())
                        .job(dto.getJob())
                        .itemLevel(dto.getLevel())
                        .partyNumber(2)
                        .clearRecord(record)
                        .build())
                .toList();

        // 양쪽 파티 합쳐서 저장
        record.setPartyMembers(Stream.concat(members1.stream(), members2.stream()).toList());

        clearRecordRepository.save(record);
    }

    public List<ClearRecordDto> getAllClearRecords() {
        return clearRecordRepository.findAll().stream()
                .map(ClearRecordDto::fromEntity)
                .collect(Collectors.toList());
    }
    public ClearRecordDto getTopClearRecord(String boss) {
        return clearRecordRepository.findTopByBossOrderByClearTimeAsc(boss)
                .map(ClearRecordDto::fromEntity)
                .orElseThrow(() -> new RuntimeException("기록 없음"));
    }

    public List<JobTierDto> getJobTierByBoss(String boss) {
        List<Object[]> stats = clearRecordRepository.findJobStatsByBoss(boss);

        List<JobTierDto> result = new ArrayList<>();
        for (int i = 0; i < stats.size(); i++) {
            String job = (String) stats.get(i)[0];
            Long count = (Long) stats.get(i)[1];
            BigDecimal avgSecDecimal = (BigDecimal) stats.get(i)[2]; // ✅ 수정된 부분

            int seconds = avgSecDecimal.intValue();
            String formatted = String.format("%02d:%02d", seconds / 60, seconds % 60);

            result.add(new JobTierDto(
                    job,
                    i < 3 ? 1 : (i < 6 ? 2 : 3),
                    count.intValue(),
                    seconds,
                    formatted,
                    "/icons/" + mapJobToIcon(job) + ".png"
            ));
        }
        return result;
    }
    private String mapJobToIcon(String job) {
        return switch (job) {
            case "홀리나이트" -> "holy_knight";
            case "바드" -> "bard";
            case "기공사" -> "soul_master";
            case "브레이커" -> "breaker";
            case "도화가" -> "artist";
            case "기상술사" -> "weather_artist";
            case "창술사" -> "lancer";
            case "슬레이어" -> "slayer";
            case "건슬링어" -> "gunslinger";
            case "소서리스" -> "sorceress";
            case "버서커" -> "berserker";
            case "워로드" -> "warload";
            case "디스트로이어" -> "destroyer";
            case "아르카나" -> "arcana";
            case "서머너" -> "summoner";
            case "데빌헌터" -> "devil_hunter";
            case "호크아이" -> "hawkeye";
            case "블래스터" -> "blaster";
            case "스카우터" -> "scouter";
            case "배틀마스터" -> "battle_master";
            case "인파이터" -> "infighter";
            case "스트라이커" -> "striker";
            case "블레이드" -> "blade";
            case "리퍼" -> "reapler";
            case "데모닉" -> "demonic";
            case "소울이터" -> "soul_eater";
            case "환수사" -> "wild_soul";


            // 필요한 직업 계속 추가
            default -> "default_icon";
        };
    }
}
