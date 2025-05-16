package com.finalteam.loacompass.population.service;

import com.finalteam.loacompass.population.dto.ServerClassDistributionDto;
import com.finalteam.loacompass.population.dto.ServerPopulationDto;
import com.finalteam.loacompass.population.repository.CharacterRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

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
}