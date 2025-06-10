package com.finalteam.loacompass.capture;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/ocr")
public class   OCRController {

    private final TesseractOCRService ocrService;

    public OCRController(TesseractOCRService ocrService) {
        this.ocrService = ocrService;
    }

    @PostMapping
    public ResponseEntity<?> ocr(@RequestParam("image") MultipartFile file) {
        return ResponseEntity.ok(ocrService.extractText(file));
    }
}
