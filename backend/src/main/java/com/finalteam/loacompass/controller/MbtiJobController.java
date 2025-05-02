package com.finalteam.loacompass.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finalteam.loacompass.dto.MbtiJobRequest;
import com.finalteam.loacompass.dto.MbtiJobResponse;
import com.finalteam.loacompass.service.MbtiJobService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/mbti")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class MbtiJobController {

    private final MbtiJobService mbtiJobService;
    
    @PostMapping("/job-recommendation")
    public ResponseEntity<MbtiJobResponse> getJobRecommendation(@RequestBody MbtiJobRequest request) {
        log.info("MBTI 직업 추천 요청: {}", request.getMbti());
        MbtiJobResponse response = mbtiJobService.recommendJobsByMbti(request);
        return ResponseEntity.ok(response);
    }
} 