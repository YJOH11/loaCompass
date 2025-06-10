package com.finalteam.loacompass.clearrecord.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClearPartyMember {

    @Id
    @GeneratedValue
    private Long id;

    private String characterName;
    private String job;
    private int itemLevel;
    private int partyNumber; // 1 or 2

    @ManyToOne
    @JoinColumn(name = "clear_record_id")
    private ClearRecord clearRecord;
}
