package com.finalteam.loacompass.dto;

import lombok.Data;
import java.util.List;

@Data
public class CharacterSummaryDto {
    private CharacterProfileDto profile;
    private List<EquipmentDto> equipments;
}
