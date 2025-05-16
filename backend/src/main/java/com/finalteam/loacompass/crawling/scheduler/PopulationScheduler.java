package com.finalteam.loacompass.crawling.scheduler;

import com.finalteam.loacompass.crawling.client.FlaskPopulationClient;
import com.finalteam.loacompass.crawling.dto.PopulationCrawlDto;
import com.finalteam.loacompass.population.service.PopulationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class PopulationScheduler {

    private final FlaskPopulationClient flaskClient;
    private final PopulationService populationService;

    public PopulationScheduler(FlaskPopulationClient flaskClient, PopulationService populationService) {
        this.flaskClient = flaskClient;
        this.populationService = populationService;
    }

    // 매일 새벽 4시 실행 (한국 시간 기준)
    // @Scheduled(cron = "0 0 4 * * *", zone = "Asia/Seoul")

    // (테스트용) 30초마다 실행
    @Scheduled(cron = "*/30 * * * * *", zone = "Asia/Seoul")
    public void fetchDailyPopulation() {
        log.info(" [Scheduler] 서버 인구 자동 수집 시작");

        try {
            List<PopulationCrawlDto> rawData = flaskClient.fetchPopulation();
            log.info("📦 Flask 응답 수: {}", rawData.size());

            populationService.savePopulationSnapshot(rawData);

            log.info(" [Scheduler] 서버 인구 저장 완료");

        } catch (Exception e) {
            log.error("❌ [Scheduler] 인구 저장 실패: {}", e.getMessage(), e);
        }
    }
}
