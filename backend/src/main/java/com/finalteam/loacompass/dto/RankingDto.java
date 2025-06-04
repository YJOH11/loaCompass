package com.finalteam.loacompass.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RankingDto {

    private int rank;              // 순위
    private String characterName;  // 닉네임
    private String serverName;     // 서버명
    private String characterClass; // 직업
    private double itemLevel;      // 아이템 레벨
//    private int score;             // 캐릭터 점수 (자체 계산 기준) ,  점수는 프론트에서 전담중이니 우선 제외

}
