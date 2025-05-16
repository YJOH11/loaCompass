package com.finalteam.loacompass.crawling.controller;

import com.finalteam.loacompass.crawling.client.FlaskPopulationClient;
import com.finalteam.loacompass.crawling.dto.PopulationCrawlDto;
import com.finalteam.loacompass.population.service.PopulationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/crawling/population")
public class PopulationProxyController {

    private final FlaskPopulationClient flaskClient;
    private final PopulationService populationService;

    public PopulationProxyController(FlaskPopulationClient flaskClient, PopulationService populationService) {
        this.flaskClient = flaskClient;
        this.populationService = populationService;
    }

    @PostMapping("/save")
    public String fetchAndSave() {
        List<PopulationCrawlDto> rawData = flaskClient.fetchPopulation();
        populationService.savePopulationSnapshot(rawData); // 직접 전달
        return "저장 완료!";
    }
}
