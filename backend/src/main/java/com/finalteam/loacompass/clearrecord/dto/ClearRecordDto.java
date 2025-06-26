package com.finalteam.loacompass.clearrecord.dto;

import com.finalteam.loacompass.clearrecord.entity.ClearRecord;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class ClearRecordDto {

    private Long id;
    private String boss;
    private String difficulty;
    private String clearTime;
    private String guildName;
    private String screenshotPath;
    private LocalDateTime submittedAt;
    private List<PartyMemberDto> party1;
    private List<PartyMemberDto> party2;

    public static ClearRecordDto fromEntity(ClearRecord record) {
        List<PartyMemberDto> party1 = record.getPartyMembers().stream()
                .filter(m -> m.getPartyNumber() == 1)
                .map(m -> new PartyMemberDto(m.getCharacterName(), m.getJob(), m.getItemLevel()))
                .toList();

        List<PartyMemberDto> party2 = record.getPartyMembers().stream()
                .filter(m -> m.getPartyNumber() == 2)
                .map(m -> new PartyMemberDto(m.getCharacterName(), m.getJob(), m.getItemLevel()))
                .toList();

        return ClearRecordDto.builder()
                .id(record.getId())
                .boss(record.getBoss())
                .difficulty(record.getDifficulty())
                .clearTime(record.getClearTime())
                .guildName(record.getGuildName())
                .screenshotPath(record.getScreenshotPath())
                .submittedAt(record.getSubmittedAt())
                .party1(party1)
                .party2(party2)
                .build();
    }
}

