package com.finalteam.loacompass.service;

import com.finalteam.loacompass.dto.CommentDto;
import java.util.List;

public interface CommentService {
    CommentDto write(CommentDto comment);
    List<CommentDto> getComments(Long boardId);
    CommentDto update(CommentDto comment);
    void delete(Long id);
    boolean toggleLike(Long id);
}

