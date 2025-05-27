package com.finalteam.loacompass.population.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

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

    @Column(name = "character_name", nullable = false)
    private String characterName;

    private String serverName;

    private String characterClass;

    private float itemLevel;

    @Column(name = "recorded_at")
    private LocalDateTime recordedAt;  // 검색된 날짜



    @Enumerated(EnumType.STRING)
    private RecordSourceType source;
}
