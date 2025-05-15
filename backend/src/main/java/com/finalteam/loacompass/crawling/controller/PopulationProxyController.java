package com.finalteam.loacompass.crawling.controller;

import com.finalteam.loacompass.crawling.client.FlaskPopulationClient;
import com.finalteam.loacompass.crawling.dto.PopulationCrawlDto;
import com.finalteam.loacompass.population.service.PopulationService;
import com.finalteam.loacompass.population.dto.PopulationDto;
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

        List<PopulationDto> toSave = rawData.stream().map(crawl -> {
            PopulationDto dto = new PopulationDto();
            dto.setServer(crawl.getServer());
            dto.setPopulation(crawl.getPopulation());
            dto.setChange(crawl.getChange());
            return dto;
        }).collect(Collectors.toList());

        populationService.savePopulationSnapshot(toSave);
        return "저장 완료!";
    }
}
