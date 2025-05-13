package com.finalteam.loacompass.population.service;

import com.finalteam.loacompass.population.dto.PopulationDto;
import com.finalteam.loacompass.population.entity.PopulationLog;
import com.finalteam.loacompass.population.repository.PopulationLogRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PopulationService {

    private final PopulationLogRepository repository;

    public PopulationService(PopulationLogRepository repository) {
        this.repository = repository;
    }

    public void savePopulationSnapshot(List<PopulationDto> dtoList) {
        LocalDateTime now = LocalDateTime.now();  // 한 번만 생성

        for (PopulationDto dto : dtoList) {
            PopulationLog log = PopulationLog.builder()
                    .serverName(dto.getServer())
                    .population(dto.getPopulation())
                    .changeRate(dto.getChange())
                    .recordedAt(now)  // 모두 동일한 시간
                    .build();

            repository.save(log);
        }
    }

    public List<PopulationLog> getLatestPopulation() {
        return repository.findLatestSnapshot();
    }
    }
