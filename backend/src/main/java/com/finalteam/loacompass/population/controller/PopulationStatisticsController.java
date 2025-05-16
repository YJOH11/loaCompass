package com.finalteam.loacompass.population.controller;

import com.finalteam.loacompass.population.dto.ServerClassDistributionDto;
import com.finalteam.loacompass.population.dto.ServerPopulationDto;
import com.finalteam.loacompass.population.dto.TopCharacterDto;
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

    @GetMapping("/server-count")
    public List<ServerPopulationDto> getServerCounts() {
        return service.getTodayServerPopulation();
    }

    @GetMapping("/server-class-distribution")
    public List<ServerClassDistributionDto> getServerClassDistribution() {
        return service.getTodayClassDistribution();
    }

    @GetMapping("/top-player")
    public TopCharacterDto getTopPlayer() {
        return service.getTodayTopCharacter();
    }
}