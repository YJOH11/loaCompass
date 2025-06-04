package com.finalteam.loacompass.controller;

import com.finalteam.loacompass.dto.CommentDto;
import com.finalteam.loacompass.service.CommentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public CommentDto write(@RequestBody CommentDto comment) {
        return commentService.write(comment);
    }

    @GetMapping("/board/{boardId}")
    public List<CommentDto> list(@PathVariable Long boardId) {
        return commentService.getComments(boardId);
    }

    @PutMapping("/{id}")
    public CommentDto update(@PathVariable Long id, @RequestBody CommentDto comment) {
        comment.setId(id);
        return commentService.update(comment);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        commentService.delete(id);
    }

    @PostMapping("/{id}/like")
    public boolean toggleLike(@PathVariable Long id) {
        return commentService.toggleLike(id);
    }
}

