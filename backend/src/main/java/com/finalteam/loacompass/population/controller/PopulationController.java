package com.finalteam.loacompass.population.controller;

import com.finalteam.loacompass.population.entity.PopulationLog;
import com.finalteam.loacompass.population.service.PopulationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/population")
public class PopulationController {

    private final PopulationService populationService;

    public PopulationController(PopulationService populationService) {
        this.populationService = populationService;
    }

    @GetMapping("/latest")
    public List<PopulationLog> getLatestPopulation() {
        return populationService.getLatestPopulation();
    }

    @GetMapping("/history")
    public List<PopulationLog> getPopulationHistory(@RequestParam String server) {
        return populationService.getPopulationHistory(server);
    }

    @GetMapping("/rank")
    public List<PopulationLog> getServerRanking() {
        return populationService.getServerRanking();
    }
}
