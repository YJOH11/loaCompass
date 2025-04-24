package com.finalteam.loacompass.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ArmoryResponse {

    @JsonProperty("ArmoryProfile")
    private CharacterProfileDto armoryProfile;

    // 필요 시 ArmoryEquipment 등 다른 필드도 추가 가능
}

