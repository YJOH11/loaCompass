package com.finalteam.loacompass.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.finalteam.loacompass.dto.GemDto;
import lombok.Data;

import java.util.List;

@Data
public class ArmoryGem {
    @JsonProperty("Gems")
    private List<GemDto> gems;

    @JsonProperty("Effect")
    private List<String> effect; // 필요 없다면 생략 가능
}
