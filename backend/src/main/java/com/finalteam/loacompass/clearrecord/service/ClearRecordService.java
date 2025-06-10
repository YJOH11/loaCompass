package com.finalteam.loacompass.clearrecord.service;

import com.finalteam.loacompass.clearrecord.dto.ClearRecordDto;
import com.finalteam.loacompass.clearrecord.dto.ClearRecordRequest;
import com.finalteam.loacompass.clearrecord.entity.ClearPartyMember;
import com.finalteam.loacompass.clearrecord.entity.ClearRecord;
import com.finalteam.loacompass.clearrecord.repository.ClearRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
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
}
