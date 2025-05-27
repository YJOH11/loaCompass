package com.finalteam.loacompass.service;

import com.finalteam.loacompass.dto.CommentDto;
import com.finalteam.loacompass.mapper.CommentMapper;
import com.finalteam.loacompass.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentMapper commentMapper;
    private final Set<Long> likedCommentIds = new HashSet<>();

    @Autowired
    public CommentServiceImpl(CommentMapper commentMapper) {
        this.commentMapper = commentMapper;
    }

    @Override
    public CommentDto write(CommentDto comment) {
        commentMapper.insert(comment);
        return comment;
    }

    @Override
    public List<CommentDto> getComments(Long boardId) {
        return commentMapper.findByBoardId(boardId);
    }

    @Override
    public CommentDto update(CommentDto comment) {
        commentMapper.update(comment);
        return comment;
    }

    @Override
    public void delete(Long id) {
        commentMapper.delete(id);
    }

    @Override
    public boolean toggleLike(Long commentId) {
        if (likedCommentIds.contains(commentId)) {
            likedCommentIds.remove(commentId);
            return false;
        } else {
            likedCommentIds.add(commentId);
            return true;
        }
    }
}
