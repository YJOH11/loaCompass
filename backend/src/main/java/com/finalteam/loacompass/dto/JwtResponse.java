package com.finalteam.loacompass.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
    private String token;

    @Builder.Default
    private String type = "Bearer";

    private Long id;
    private String username;
    private String email;
    private String nickname;
    private String role;
    private LocalDateTime createdAt;

}