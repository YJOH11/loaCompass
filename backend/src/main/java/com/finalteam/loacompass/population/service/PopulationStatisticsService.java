package com.finalteam.loacompass.population.service;

import com.finalteam.loacompass.population.dto.LevelRangeDto;
import com.finalteam.loacompass.population.dto.ServerClassDistributionDto;
import com.finalteam.loacompass.population.dto.ServerPopulationDto;
import com.finalteam.loacompass.population.dto.TopCharacterDto;
import com.finalteam.loacompass.population.entity.CharacterRecord;
import com.finalteam.loacompass.population.repository.CharacterRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PopulationStatisticsService {

    private final CharacterRecordRepository repository;

    public List<ServerPopulationDto> getServerPopulation() {
        List<Object[]> raw = repository.getTotalServerPopulation();
        return raw.stream()
                .map(row -> new ServerPopulationDto((String) row[0], (Long) row[1]))
                .toList();
    }

    public List<ServerClassDistributionDto> getClassDistribution() {
        List<Object[]> raw = repository.getTotalServerClassDistribution();
        return raw.stream()
                .map(row -> new ServerClassDistributionDto((String) row[0], (String) row[1], (Long) row[2]))
                .toList();
    }

    public TopCharacterDto getTopCharacter() {
        CharacterRecord record = repository.findTopByOrderByItemLevelDesc()
                .orElseThrow(() -> new NoSuchElementException("저장된 캐릭터가 없습니다."));

        return new TopCharacterDto(
                record.getCharacterName(),
                record.getItemLevel(),
                record.getCharacterClass(),
                record.getServerName()
        );
    }

    public List<LevelRangeDto> getLevelDistribution() {
        List<CharacterRecord> records = repository.findAll();

        Map<String, Map<String, Long>> grouped = records.stream()
                .collect(Collectors.groupingBy(
                        CharacterRecord::getServerName,
                        Collectors.groupingBy(
                                r -> levelBin(r.getItemLevel()),
                                Collectors.counting()
                        )
                ));

        List<LevelRangeDto> result = new ArrayList<>();
        for (var serverEntry : grouped.entrySet()) {
            String server = serverEntry.getKey();
            for (var binEntry : serverEntry.getValue().entrySet()) {
                result.add(new LevelRangeDto(server, binEntry.getKey(), binEntry.getValue()));
            }
        }

        return result;
    }

    private String levelBin(float level) {
        if (level >= 1760f) return "1760+";
        if (level < 1640f) return "1640 미만";
        int lower = ((int) level / 10) * 10;
        int upper = lower + 10;
        return lower + "-" + upper;
    }
}
