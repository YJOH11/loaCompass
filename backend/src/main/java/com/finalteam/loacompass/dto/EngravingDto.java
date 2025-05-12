package com.finalteam.loacompass.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EngravingDto {
    private String name;   // ex. 원한
    private String grade;  // ex. 유물
    private String level;  // ex. "Lv.4"
}