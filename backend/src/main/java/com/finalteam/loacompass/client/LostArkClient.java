package com.finalteam.loacompass.client;

import com.finalteam.loacompass.dto.*;
import com.finalteam.loacompass.util.GemTooltipParser;
import com.finalteam.loacompass.util.TooltipParser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component

public class LostArkClient {

    private final WebClient lostArkWebClient;

    public CharacterProfileDto getCharacterProfile(String nickname) {
        ArmoryResponse response = lostArkWebClient.get()
                .uri("/armories/characters/{name}", nickname)
                .retrieve()
                .bodyToMono(ArmoryResponse.class)
                .block();
        return response.getArmoryProfile();
    }

    private boolean isGear(String type) {
        return List.of("무기", "투구", "상의", "하의", "장갑", "어깨").contains(type);
    }

    private boolean isAccessory(String type) {
        return List.of("목걸이", "귀걸이", "반지").contains(type);
    }

    private boolean isAbilityStone(String type) {
        return "어빌리티 스톤".equals(type);
    }

    private boolean isBracelet(String type) {
        return "팔찌".equals(type);
    }

    public List<EquipmentDto> getCharacterEquipment(String nickname) {
        ArmoryResponse response = lostArkWebClient.get()
                .uri("/armories/characters/{name}", nickname)
                .retrieve()
                .bodyToMono(ArmoryResponse.class)
                .block();

        List<EquipmentDto> equipmentList = response.getArmoryEquipment();

        int totalTranscendence = 0;

        for (EquipmentDto dto : equipmentList) {
            log.info("==== [{}] {} ====", dto.getType(), dto.getName());

            TooltipParser.populateGeneralDetails(dto); // 장비/악세서리 공통 정보

            if (isGear(dto.getType())) {
                TooltipParser.populateEquipmentDetails(dto); // 강화, 초월, 엘릭서 등 장비 전용
            }
        }

        return equipmentList;
    }

    public CharacterSummaryDto getCharacterSummary(String nickname) {
        ArmoryResponse response = lostArkWebClient.get()
                .uri("/armories/characters/{name}", nickname)
                .retrieve()
                .bodyToMono(ArmoryResponse.class)
                .block();

        CharacterSummaryDto summary = new CharacterSummaryDto();
        summary.setProfile(response.getArmoryProfile());

        // 장비
        List<EquipmentDto> equipmentList = response.getArmoryEquipment();
        int totalTranscendence = 0;

        for (EquipmentDto dto : equipmentList) {
            TooltipParser.populateGeneralDetails(dto);

            if (isGear(dto.getType())) {
                TooltipParser.populateEquipmentDetails(dto);
                if (dto.getTranscendencePoint() != null) {
                    totalTranscendence += dto.getTranscendencePoint();
                }
            } else if ("어빌리티 스톤".equals(dto.getType())) {
                TooltipParser.populateAbilityStoneDetails(dto);
            } else if ("팔찌".equals(dto.getType())) {
                TooltipParser.populateBraceletDetails(dto);
            }
        }
        summary.setEquipments(equipmentList);
        summary.setTranscendenceTotal(totalTranscendence);

        // 보석
        List<GemDto> gems = response.getArmoryGem().getGems();
        if (gems != null) {
            for (GemDto gem : gems) {
                System.out.println("raw Icon from dto: " + gem.getIcon());
                GemTooltipParser.populateGemDetails(gem);
                System.out.println("after parsing icon: " + gem.getIcon());
            }
            summary.setGems(gems);
        }

        return summary;
    }


}

