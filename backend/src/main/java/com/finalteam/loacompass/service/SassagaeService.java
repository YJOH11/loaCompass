package com.finalteam.loacompass.service;

import java.util.List;
import com.finalteam.loacompass.dto.SassagaePostDto;

public interface SassagaeService {
    List<SassagaePostDto> searchPosts(String keyword, String searchType, int maxConcurrent);
}