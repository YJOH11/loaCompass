package com.finalteam.loacompass.population.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CharacterRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String characterName;

    private String serverName;

    private String characterClass;

    private float itemLevel;

    private LocalDate recordedAt;  // 검색된 날짜



    @Enumerated(EnumType.STRING)
    private RecordSourceType source;
}
