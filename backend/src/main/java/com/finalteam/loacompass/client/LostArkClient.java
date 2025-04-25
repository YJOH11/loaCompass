package com.finalteam.loacompass.client;

import com.finalteam.loacompass.dto.ArmoryResponse;
import com.finalteam.loacompass.dto.CharacterProfileDto;
import com.finalteam.loacompass.dto.EquipmentDto;
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

    public List<EquipmentDto> getCharacterEquipment(String nickname) {
        ArmoryResponse response = lostArkWebClient.get()
                .uri("/armories/characters/{name}", nickname)
                .retrieve()
                .bodyToMono(ArmoryResponse.class)
                .block();

        List<EquipmentDto> equipmentList = response.getArmoryEquipment();

        int totalTranscendence = 0;

        for (EquipmentDto dto : equipmentList) {
            // 장비 유형 로그 확인용
            log.info("==== [{}] {} ====", dto.getType(), dto.getName());

            if (isGear(dto.getType())) {
                TooltipParser.populateEquipmentDetails(dto); // 강화/초월/엘릭서 추출
            } else {
                log.info("※ [{}]은(는) 장비 외 항목이므로 파싱 생략", dto.getType());
            }
        }

        return equipmentList;
    }


}

