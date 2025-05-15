package com.finalteam.loacompass.crawling.dto;

import lombok.Data;

@Data
public class PopulationCrawlDto {
    private String server;
    private int population;
    private double change;
}
