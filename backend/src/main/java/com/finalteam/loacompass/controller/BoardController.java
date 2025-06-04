package com.finalteam.loacompass.controller;

import com.finalteam.loacompass.dto.BoardDto;
import com.finalteam.loacompass.service.BoardService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boards")
public class BoardController {

    private final BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @GetMapping
    public List<BoardDto> list() {
        return boardService.findAll();
    }

    @GetMapping("/{id}")
    public BoardDto detail(@PathVariable Long id) {
        return boardService.findById(id);
    }

    @PostMapping
    public BoardDto write(@RequestBody BoardDto board) {
        return boardService.save(board);
    }

    @PutMapping("/{id}")
    public BoardDto update(@PathVariable Long id, @RequestBody BoardDto board) {
        board.setId(id);
        return boardService.update(board);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        boardService.delete(id);
    }

    @PostMapping("/{id}/like")
    public boolean toggleLike(@PathVariable Long id) {
        return boardService.toggleLike(id);
    }
}


