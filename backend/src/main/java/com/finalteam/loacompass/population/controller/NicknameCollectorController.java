package com.finalteam.loacompass.population.controller;

import com.finalteam.loacompass.population.service.NicknameCollectorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class NicknameCollectorController {

    private final NicknameCollectorService nicknameCollectorService;

    @GetMapping("/collect-random")
    public String collectRandom(@RequestParam(defaultValue = "100") int count) {
        nicknameCollectorService.collectRandom(count);
        return count + "개의 닉네임을 수집 시도했습니다.";
    }
}
