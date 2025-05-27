package com.finalteam.loacompass.controller;

import com.finalteam.loacompass.dto.DiscordUserResponse;
import com.finalteam.loacompass.service.DiscordAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class DiscordAuthController {

    private final DiscordAuthService discordAuthService;

    @PostMapping("/discord")
    public DiscordUserResponse discordLogin(@RequestBody DiscordAuthRequest request) {
        return discordAuthService.getDiscordUser(request.getCode());
    }

}
