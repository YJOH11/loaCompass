package com.finalteam.loacompass.client;

import com.finalteam.loacompass.dto.*;
import com.finalteam.loacompass.util.CardParser;
import com.finalteam.loacompass.util.GemTooltipParser;
import com.finalteam.loacompass.util.TooltipParser;
import com.finalteam.loacompass.util.EngravingParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component
public class LostArkClient {

    private final WebClient lostArkWebClient;

    // 캐릭터 프로필을 가져오는 메서드
    public CharacterProfileDto getCharacterProfile(String nickname) {
        ArmoryResponse response = lostArkWebClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/armories/characters/{name}")
                        .build(nickname))
                .retrieve()
                .bodyToMono(ArmoryResponse.class)
                .block();
        return response.getArmoryProfile();
    }

    // 카드 세트 정보를 가져오는 메서드
    public CardSetDto getCardSet(String nickname) {
        CardResponse cardResponse = lostArkWebClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/armories/characters/{name}/cards")
                        .build(nickname))
                .retrieve()
                .bodyToMono(CardResponse.class)
                .block();

        log.debug("=== cardResponse ===");
        log.debug("Effects: {}", cardResponse.getEffects());

        return CardParser.extractActiveCardSet(cardResponse);
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

    private List<EquipmentDto> parseEquipments(List<EquipmentDto> equipmentList) {
        int totalTranscendence = 0;

        for (EquipmentDto dto : equipmentList) {
            TooltipParser.populateGeneralDetails(dto);

            if (isGear(dto.getType())) {
                TooltipParser.populateEquipmentDetails(dto);
                if (dto.getTranscendencePoint() != null) {
                    totalTranscendence += dto.getTranscendencePoint();
                }
            } else if (isAbilityStone(dto.getType())) {
                TooltipParser.populateAbilityStoneDetails(dto);
            } else if (isBracelet(dto.getType())) {
                TooltipParser.populateBraceletDetails(dto);
            }
        }

        return equipmentList;
    }

    public CharacterSummaryDto getCharacterSummary(String nickname) {
        ArmoryResponse response = lostArkWebClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/armories/characters/{name}")
                        .build(nickname))
                .retrieve()
                .bodyToMono(ArmoryResponse.class)
                .block();

        CharacterSummaryDto summary = new CharacterSummaryDto();
        summary.setProfile(response.getArmoryProfile());

        List<EquipmentDto> equipmentList = parseEquipments(response.getArmoryEquipment());
        summary.setEquipments(equipmentList);
        summary.setTranscendenceTotal(calculateTotalTranscendence(equipmentList));

        List<GemDto> gems = response.getArmoryGem() != null ? response.getArmoryGem().getGems() : null;
        if (gems != null) {
            for (GemDto gem : gems) {
                GemTooltipParser.populateGemDetails(gem);
            }
            summary.setGems(gems);
        }

        List<EngravingDto> engravings = EngravingParser.parse(
                response.getArmoryEngraving().getArkPassiveEffects()
        );
        summary.getProfile().setEngravings(engravings);

        CardSetDto cardSet = getCardSet(nickname);
        summary.getProfile().setCardSet(cardSet);

        return summary;
    }

    private int calculateTotalTranscendence(List<EquipmentDto> equipmentList) {
        int totalTranscendence = 0;
        for (EquipmentDto dto : equipmentList) {
            if (dto.getTranscendencePoint() != null) {
                totalTranscendence += dto.getTranscendencePoint();
            }
        }
        return totalTranscendence;
    }
}
