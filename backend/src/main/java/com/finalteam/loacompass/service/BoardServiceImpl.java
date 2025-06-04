package com.finalteam.loacompass.service;

import com.finalteam.loacompass.dto.BoardDto;
import com.finalteam.loacompass.service.BoardService;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BoardServiceImpl implements BoardService {

    private final Map<Long, BoardDto> boardStorage = new HashMap<>();
    private final Set<Long> likedBoards = new HashSet<>();
    private Long idCounter = 1L;

    @Override
    public List<BoardDto> findAll() {
        return new ArrayList<>(boardStorage.values());
    }

    @Override
    public BoardDto findById(Long id) {
        return boardStorage.get(id);
    }

    @Override
    public BoardDto save(BoardDto board) {
        board.setId(idCounter++);
        boardStorage.put(board.getId(), board);
        return board;
    }

    @Override
    public BoardDto update(BoardDto board) {
        boardStorage.put(board.getId(), board);
        return board;
    }

    @Override
    public void delete(Long id) {
        boardStorage.remove(id);
    }

    @Override
    public boolean toggleLike(Long id) {
        if (likedBoards.contains(id)) {
            likedBoards.remove(id);
            return false;
        } else {
            likedBoards.add(id);
            return true;
        }
    }
}


