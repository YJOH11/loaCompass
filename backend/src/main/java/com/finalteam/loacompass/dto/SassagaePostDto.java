package com.finalteam.loacompass.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SassagaePostDto {
    private String title;
    private String link;
    private String server;
    private String author;
    private String date;
    private String views;
    private String content;
}