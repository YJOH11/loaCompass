package com.finalteam.loacompass.population.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FailedNickname {

    @Id
    private String nickname;

    private LocalDate lastTriedAt;
}
