package com.finalteam.loacompass.service;
import com.finalteam.loacompass.dto.DiscordTokenResponse;
import com.finalteam.loacompass.dto.DiscordUserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Service
@RequiredArgsConstructor
public class DiscordAuthService {

    @Value("${discord.client-id}")
    private String clientId;

    @Value("${discord.client-secret}")
    private String clientSecret;

    @Value("${discord.redirect-uri}")
    private String redirectUri;

    private final RestTemplate restTemplate = new RestTemplate();

    public DiscordUserResponse getDiscordUser(String code) {
        // 1️⃣ 토큰 요청
        String tokenUrl = "https://discord.com/api/oauth2/token";

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("grant_type", "authorization_code");
        params.add("code", code);
        params.add("redirect_uri", redirectUri);
        params.add("scope", "identify email");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        ResponseEntity<DiscordTokenResponse> tokenResponse = restTemplate.postForEntity(
                tokenUrl,
                request,
                DiscordTokenResponse.class
        );

        String accessToken = tokenResponse.getBody().getAccessToken();

        // 2️⃣ 유저 정보 요청
        String userUrl = "https://discord.com/api/users/@me";

        HttpHeaders userHeaders = new HttpHeaders();
        userHeaders.setBearerAuth(accessToken);

        HttpEntity<?> userRequest = new HttpEntity<>(userHeaders);

        ResponseEntity<DiscordUserResponse> userResponse = restTemplate.exchange(
                userUrl,
                HttpMethod.GET,
                userRequest,
                DiscordUserResponse.class
        );

        return userResponse.getBody();
    }
}
