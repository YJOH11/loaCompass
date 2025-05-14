package com.finalteam.loacompass.population;

import com.finalteam.loacompass.population.dto.PopulationDto;
import com.finalteam.loacompass.population.service.PopulationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PopulationTestRunner implements CommandLineRunner {

    private final PopulationLoader loader;
    private final PopulationService service;

    public PopulationTestRunner(PopulationLoader loader, PopulationService service) {
        this.loader = loader;
        this.service = service;
    }

    @Override
    public void run(String... args) {
        List<PopulationDto> list = loader.loadFromSampleJson();

        list.forEach(p -> System.out.printf("서버: %s, 인구: %d, 증감: %.2f%%\n",
                p.getServer(), p.getPopulation(), p.getChange()));

        service.savePopulationSnapshot(list);
        System.out.println("✅ 인구 데이터 저장 완료");
    }
}