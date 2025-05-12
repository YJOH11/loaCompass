package com.finalteam.loacompass.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.util.List;

@Data
public class ArmoryEngraving {
    @JsonProperty("Engravings")
    private List<Object> engravings;

    @JsonProperty("Effects")
    private Object effects;

    @JsonProperty("ArkPassiveEffects")
    private List<ArkPassiveEffect> arkPassiveEffects;
}
