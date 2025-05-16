package com.finalteam.loacompass.crawling.dto;

import lombok.Data;

import java.util.Map;

@Data
public class PopulationCrawlDto {
    private String server;
    private int population;
    private int change;
    private Map<String, Integer> levelDistribution; // level별 인구 분포
}
