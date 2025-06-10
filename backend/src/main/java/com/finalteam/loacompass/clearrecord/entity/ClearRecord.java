package com.finalteam.loacompass.clearrecord.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClearRecord {

    @Id
    @GeneratedValue
    private Long id;

    private String boss;
    private String difficulty;
    private String clearTime;
    private String guildName;
    private String screenshotPath;

    private LocalDateTime submittedAt;

    @OneToMany(mappedBy = "clearRecord", cascade = CascadeType.ALL)
    private List<ClearPartyMember> partyMembers = new ArrayList<>();

    @PrePersist
    public void onPrePersist() {
        this.submittedAt = LocalDateTime.now();
    }
}
