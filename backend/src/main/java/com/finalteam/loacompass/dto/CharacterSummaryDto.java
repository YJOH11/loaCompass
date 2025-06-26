package com.finalteam.loacompass.dto;

import lombok.Data;
import java.util.List;

@Data
public class CharacterSummaryDto {
    private CharacterProfileDto profile;
    private List<EquipmentDto> equipments;
    private int transcendenceTotal;  // 총 초월 수치
    private List<GemDto> gems;
    private List<EngravingDto> engravings;

}
