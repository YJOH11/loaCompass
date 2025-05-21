package com.finalteam.loacompass.population.service;

import com.finalteam.loacompass.population.dto.LevelRangeDto;
import com.finalteam.loacompass.population.dto.ServerClassDistributionDto;
import com.finalteam.loacompass.population.dto.ServerPopulationDto;
import com.finalteam.loacompass.population.dto.TopCharacterDto;
import com.finalteam.loacompass.population.dto.ClassDistributionDto;
import com.finalteam.loacompass.population.entity.CharacterRecord;
import com.finalteam.loacompass.population.repository.CharacterRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
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
        List<Object[]> raw = repository.getTotalLevelRangeDistribution();
        return raw.stream()
                .map(row -> new LevelRangeDto(null, (String) row[0], (Long) row[1]))
                .toList();
    }

    public List<ClassDistributionDto> getTotalClassDistribution() {
        List<Object[]> raw = repository.getTotalClassDistribution();
        return raw.stream()
                .map(row -> new ClassDistributionDto((String) row[0], (Long) row[1]))
                .toList();
    }

    public List<LevelRangeDto> getTotalLevelDistribution() {
        List<Object[]> raw = repository.getTotalLevelRangeDistribution();
        return raw.stream()
                .map(row -> new LevelRangeDto(null, (String) row[0], (Long) row[1]))
                .toList();
    }
}
