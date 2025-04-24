package com.finalteam.loacompass.client;

import com.finalteam.loacompass.dto.ArmoryResponse;
import com.finalteam.loacompass.dto.CharacterProfileDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import lombok.extern.slf4j.Slf4j;

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
}

