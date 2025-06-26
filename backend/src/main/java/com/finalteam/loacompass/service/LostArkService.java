package com.finalteam.loacompass.service;

import com.finalteam.loacompass.dto.CharacterProfileDto;
import com.finalteam.loacompass.dto.CharacterSummaryDto;
import com.finalteam.loacompass.dto.EquipmentDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LostArkService {


    @Value("${lostark.api.key}")
    private String apiKey;

    public String getCharacterInfo(String characterName) {
        String url = "https://developer-lostark.game.onstove.com/characters/" + characterName + "/siblings";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                String.class
        );

        return response.getBody();
    }
    public CharacterSummaryDto getCharacterSummary(String characterName) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // 1. 캐릭터 프로필 가져오기
        String profileUrl = "https://developer-lostark.game.onstove.com/armories/characters/" + characterName + "/profile";
        ResponseEntity<CharacterProfileDto> profileRes = restTemplate.exchange(
                profileUrl, HttpMethod.GET, entity, CharacterProfileDto.class);

        // 2. 장비 정보 가져오기
        String equipUrl = "https://developer-lostark.game.onstove.com/armories/characters/" + characterName + "/equipment";
        ResponseEntity<EquipmentDto[]> equipRes = restTemplate.exchange(
                equipUrl, HttpMethod.GET, entity, EquipmentDto[].class);


        // 3. DTO 조립
        CharacterSummaryDto dto = new CharacterSummaryDto();
        dto.setProfile(profileRes.getBody());
        dto.setEquipments(Arrays.asList(equipRes.getBody()));

        // ✨ 여기서 장비 가공
        if (equipRes.getBody() != null) {
            List<EquipmentDto> cleanEquipments = Arrays.stream(equipRes.getBody())
                    .filter(item -> item != null && item.getName() != null) // 이름 없는 거 제외
                    .map(item -> {
                        EquipmentDto simple = new EquipmentDto();
                        simple.setName(item.getName());
                        simple.setType(item.getType());
                        simple.setGrade(item.getGrade());
                        simple.setRefinementLevel(item.getRefinementLevel());
                        simple.setQuality(item.getQuality());
                        simple.setIcon(item.getIcon());
                        return simple;
                    })
                    .collect(Collectors.toList());

            dto.setEquipments(cleanEquipments);
        }

        return dto;
    }

}


