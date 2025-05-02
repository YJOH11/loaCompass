package com.finalteam.loacompass.controller;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.finalteam.loacompass.service.SassagaeService;
import com.finalteam.loacompass.dto.SassagaePostDto;

@RestController
@RequestMapping("/api/sassagae")
@CrossOrigin(origins = "*")
public class SassagaeController {

    @Autowired
    private SassagaeService sassagaeService;

    @GetMapping("/search")
    public List<SassagaePostDto> searchSassagae(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "subject") String searchType,
            @RequestParam(defaultValue = "5") int maxConcurrent) {

        return sassagaeService.searchPosts(keyword, searchType, maxConcurrent);
    }
}