package com.finalteam.loacompass.population.service;

import com.finalteam.loacompass.population.entity.PopulationLog;
import com.finalteam.loacompass.population.repository.PopulationLogRepository;
import com.finalteam.loacompass.crawling.dto.PopulationCrawlDto;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PopulationService {

    private final PopulationLogRepository repository;

    public PopulationService(PopulationLogRepository repository) {
        this.repository = repository;
    }

    public void savePopulationSnapshot(List<PopulationCrawlDto> dtoList) {
        LocalDateTime now = LocalDateTime.now();  // 한 번만 생성

        for (PopulationCrawlDto dto : dtoList) {
            PopulationLog log = PopulationLog.builder()
                    .serverName(dto.getServer())
                    .population(dto.getPopulation())
                    .changeRate(dto.getChange())
                    .recordedAt(now)
                    .build();

            repository.save(log);
        }
    }

    public List<PopulationLog> getLatestPopulation() {
        return repository.findLatestSnapshot();
    }

    public List<PopulationLog> getPopulationHistory(String serverName) {
        return repository.findAllByServerNameOrderByRecordedAtAsc(serverName);
    }

    public List<PopulationLog> getServerRanking() {
        return repository.findRankedSnapshot();
    }
}
