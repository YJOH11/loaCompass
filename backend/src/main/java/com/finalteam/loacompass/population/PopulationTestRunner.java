package com.finalteam.loacompass.population;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PopulationTestRunner implements CommandLineRunner {

    private final PopulationLoader loader;

    public PopulationTestRunner(PopulationLoader loader) {
        this.loader = loader;
    }

    @Override
    public void run(String... args) {
        List<PopulationDto> list = loader.loadFromSampleJson();
        list.forEach(p -> System.out.printf("서버: %s, 인구: %d, 증감: %.2f%%\n",
                p.getServer(), p.getPopulation(), p.getChange()));
    }
}