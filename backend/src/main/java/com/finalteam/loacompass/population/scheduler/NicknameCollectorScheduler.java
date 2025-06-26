package com.finalteam.loacompass.population.scheduler;

import com.finalteam.loacompass.population.service.NicknameCollectorService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
@RequiredArgsConstructor
public class NicknameCollectorScheduler {

    private final NicknameCollectorService collector;

    @Scheduled(cron = "0 0 4 * * *") // 매일 새벽 4시
    public void collectDaily() {
        int count = 500 + new Random().nextInt(501); // 500~1000 랜덤
        System.out.println(" [스케줄러] " + count + "개 닉네임 수집 시작...");
        collector.collectRandom(count);
    }
}
