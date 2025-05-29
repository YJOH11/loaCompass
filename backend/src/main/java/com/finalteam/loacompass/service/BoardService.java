package com.finalteam.loacompass.service;

import com.finalteam.loacompass.dto.BoardDto;

import java.util.List;

public interface BoardService {
    List<BoardDto> findAll();
    BoardDto findById(Long id);
    BoardDto save(BoardDto board);
    BoardDto update(BoardDto board);
    void delete(Long id);
    boolean toggleLike(Long id);
}






