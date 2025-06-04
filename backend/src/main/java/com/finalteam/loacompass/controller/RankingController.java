package com.finalteam.loacompass.controller;

import com.finalteam.loacompass.dto.RankingDto;
import com.finalteam.loacompass.service.RankingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rankings")
@RequiredArgsConstructor
public class RankingController {

    private final RankingService rankingService;

    // 아이템 레벨 기준으로 정렬된 캐릭터 랭킹 반환
    @GetMapping
    public List<RankingDto> getRankings() {
        return rankingService.getRankingList();
    }
}
