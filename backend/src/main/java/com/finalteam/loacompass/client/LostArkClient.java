package com.finalteam.loacompass.client;

import com.finalteam.loacompass.dto.ArmoryResponse;
import com.finalteam.loacompass.dto.CharacterProfileDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RequiredArgsConstructor
@Component

public class LostArkClient {

    private final WebClient lostArkWebClient;

    public CharacterProfileDto getCharacterProfile(String nickname) {
        return lostArkWebClient.get()
                .uri("/armories/characters/{name}", nickname)
                .retrieve()
                .bodyToMono(ArmoryResponse.class) // 전체 응답 구조 파싱
                .block()
                .getArmoryProfile(); // 그중 필요한 profile만 꺼냄
    }
}

