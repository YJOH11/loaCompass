package com.finalteam.loacompass.clearrecord.controller;

import com.finalteam.loacompass.clearrecord.dto.ClearRecordDto;
import com.finalteam.loacompass.clearrecord.dto.ClearRecordRequest;
import com.finalteam.loacompass.clearrecord.service.ClearRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/clear-records")
@RequiredArgsConstructor
public class ClearRecordController {

    private final ClearRecordService clearRecordService;

    @PostMapping
    public ResponseEntity<?> submitClearRecord(
            @RequestPart("data") ClearRecordRequest request,
            @RequestPart(value = "screenshot", required = false) MultipartFile screenshot) {

        clearRecordService.saveClearRecord(request, screenshot);
        return ResponseEntity.ok().body("클리어 기록이 저장되었습니다.");
    }

    @GetMapping
    public ResponseEntity<List<ClearRecordDto>> getAllClearRecords() {
        List<ClearRecordDto> list = clearRecordService.getAllClearRecords();
        return ResponseEntity.ok(list);
    }

}
