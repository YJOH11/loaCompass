package com.finalteam.loacompass.population.controller;

import com.finalteam.loacompass.population.dto.*;
import com.finalteam.loacompass.population.service.PopulationStatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/statistics")
@RequiredArgsConstructor
public class PopulationStatisticsController {

    private final PopulationStatisticsService service;

    // 누적 기준: 최고 아이템 레벨 유저 조회
    @GetMapping("/top-player")
    public TopCharacterDto getTopPlayer() {
        return service.getTotalTopCharacter();
    }

    // 누적 기준: 서버별 인구 수 집계
    @GetMapping("/server-count")
    public List<ServerPopulationDto> getServerCounts() {
        return service.getTotalServerPopulation();
    }

    // 누적 기준: 전체 직업 비율 분포
    @GetMapping("/total-class-distribution")
    public List<ClassDistributionDto> getTotalClassDistribution() {
        return service.getTotalClassDistribution();
    }

    // 누적 기준: 전체 레벨 구간 비율 분포
    @GetMapping("/total-level-distribution")
    public List<LevelRangeDto> getTotalLevelDistribution() {
        return service.getTotalLevelDistribution();
    }
}
