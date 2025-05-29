package com.finalteam.loacompass.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CommentDto {
    private Long id;
    private Long boardId;
    private String content;
    private String author;
    private int likeCount;

    public CommentDto() {}

    public CommentDto(Long id, Long boardId, String content, String author, int likeCount) {
        this.id = id;
        this.boardId = boardId;
        this.content = content;
        this.author = author;
        this.likeCount = likeCount;
    }

}

