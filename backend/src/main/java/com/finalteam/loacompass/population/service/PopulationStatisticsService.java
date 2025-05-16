package com.finalteam.loacompass.population.service;

import com.finalteam.loacompass.population.dto.ServerClassDistributionDto;
import com.finalteam.loacompass.population.dto.ServerPopulationDto;
import com.finalteam.loacompass.population.dto.TopCharacterDto;
import com.finalteam.loacompass.population.entity.CharacterRecord;
import com.finalteam.loacompass.population.repository.CharacterRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class PopulationStatisticsService {

    private final CharacterRecordRepository repository;

    public List<ServerPopulationDto> getTodayServerPopulation() {
        LocalDate today = LocalDate.now();
        List<Object[]> raw = repository.getServerPopulation(today);
        return raw.stream()
                .map(row -> new ServerPopulationDto((String) row[0], (Long) row[1]))
                .toList();
    }

    public List<ServerClassDistributionDto> getTodayClassDistribution() {
        LocalDate today = LocalDate.now();
        List<Object[]> raw = repository.getServerClassDistribution(today);
        return raw.stream()
                .map(row -> new ServerClassDistributionDto((String) row[0], (String) row[1], (Long) row[2]))
                .toList();
    }

    public TopCharacterDto getTodayTopCharacter() {
        LocalDate today = LocalDate.now();
        CharacterRecord record = repository.findTopByRecordedAtOrderByItemLevelDesc(today)
                .orElseThrow(() -> new NoSuchElementException("오늘 저장된 캐릭터가 없습니다."));

        return new TopCharacterDto(
                record.getCharacterName(),
                record.getItemLevel(),
                record.getCharacterClass(),
                record.getServerName()
        );
    }
}