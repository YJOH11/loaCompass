package com.finalteam.loacompass.service;

import com.finalteam.loacompass.dto.RankingDto;
import com.finalteam.loacompass.population.entity.CharacterRecord;
import com.finalteam.loacompass.population.repository.CharacterRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class RankingService {

    private final CharacterRecordRepository characterRecordRepository;

    public List<RankingDto> getRankingList() {
        List<CharacterRecord> topRecords = characterRecordRepository.findTop50LatestRecords();

        return IntStream.range(0, topRecords.size())
                .mapToObj(i -> {
                    CharacterRecord record = topRecords.get(i);
                    return RankingDto.builder()
                            .rank(i + 1)
                            .characterName(record.getCharacterName())
                            .serverName(record.getServerName())
                            .characterClass(record.getCharacterClass())
                            .itemLevel(record.getItemLevel())
                            .build();
                })
                .collect(Collectors.toList());
    }

}
