package com.finalteam.loacompass.mapper;

import com.finalteam.loacompass.dto.CommentDto;
import java.util.List;

public interface CommentMapper {
    int insert(CommentDto comment);
    List<CommentDto> findByBoardId(Long boardId);
    int update(CommentDto comment);
    int delete(Long id);
    CommentDto selectCommentById(Long id);
}
