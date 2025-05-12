package com.finalteam.loacompass.client;

import com.finalteam.loacompass.dto.*;
import com.finalteam.loacompass.util.CardParser;
import com.finalteam.loacompass.util.GemTooltipParser;
import com.finalteam.loacompass.util.TooltipParser;
import com.finalteam.loacompass.util.EngravingParser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.util.UriUtils;


import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Component
public class LostArkClient {

    private final WebClient lostArkWebClient;

    // 캐릭터 프로필을 가져오는 메서드
    public CharacterProfileDto getCharacterProfile(String nickname) {
        ArmoryResponse response = lostArkWebClient.get()
                .uri("/armories/characters/{name}", nickname)
                .retrieve()
                .bodyToMono(ArmoryResponse.class)
                .block();
        return response.getArmoryProfile();


    }

    // 카드 세트 정보를 가져오는 메서드
    public CardSetDto getCardSet(String nickname) {
        CardResponse cardResponse = lostArkWebClient.get()
                .uri("/armories/characters/{name}/cards", nickname)
                .retrieve()
                .bodyToMono(CardResponse.class)
                .block();

        log.debug("=== cardResponse ===");
        log.debug("Effects: {}", cardResponse.getEffects());

        return CardParser.extractActiveCardSet(cardResponse);
    }

    // 장비 타입이 Gear인지 체크하는 메서드
    private boolean isGear(String type) {
        return List.of("무기", "투구", "상의", "하의", "장갑", "어깨").contains(type);
    }

    // 악세서리 타입 체크 메서드
    private boolean isAccessory(String type) {
        return List.of("목걸이", "귀걸이", "반지").contains(type);
    }

    // 어빌리티 스톤 타입 체크 메서드
    private boolean isAbilityStone(String type) {
        return "어빌리티 스톤".equals(type);
    }

    // 팔찌 타입 체크 메서드
    private boolean isBracelet(String type) {
        return "팔찌".equals(type);
    }

    // 장비 정보를 파싱하는 메서드
    private List<EquipmentDto> parseEquipments(List<EquipmentDto> equipmentList) {
        int totalTranscendence = 0;

        for (EquipmentDto dto : equipmentList) {
            TooltipParser.populateGeneralDetails(dto); // 장비/악세서리 공통 정보

            if (isGear(dto.getType())) {
                TooltipParser.populateEquipmentDetails(dto); // 강화, 초월, 엘릭서 등 장비 전용
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

    // 캐릭터 요약 정보를 가져오는 메서드
    public CharacterSummaryDto getCharacterSummary(String nickname) {
        String encodedNickname = UriUtils.encode(nickname, StandardCharsets.UTF_8);

        ArmoryResponse response = lostArkWebClient.get()
                .uri("/armories/characters/{name}", encodedNickname)
                .retrieve()
                .bodyToMono(ArmoryResponse.class)
                .block();


        CharacterSummaryDto summary = new CharacterSummaryDto();
        summary.setProfile(response.getArmoryProfile());

        // 장비
        List<EquipmentDto> equipmentList = parseEquipments(response.getArmoryEquipment());
        summary.setEquipments(equipmentList);
        summary.setTranscendenceTotal(calculateTotalTranscendence(equipmentList));

        // 보석
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


        // 카드 세트
        CardSetDto cardSet = getCardSet(nickname);
        summary.getProfile().setCardSet(cardSet);

        return summary;

    }

    // 장비의 총 초월 수치를 계산하는 메서드
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
