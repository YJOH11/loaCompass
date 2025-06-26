package com.finalteam.loacompass.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BoardDto {
    private Long id;
    private String title;
    private String content;

    public BoardDto() {}

    public BoardDto(Long id, String title, String content) {
        this.id = id;
        this.title = title;
        this.content = content;
    }

}






