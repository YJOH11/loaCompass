package com.finalteam.loacompass.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // 모든 요청 허용
                        .allowedOrigins("http://localhost:5173") // 프론트 주소
                        .allowedMethods("*") // GET, POST 등 모두 허용
                        .allowCredentials(true);
            }
        };
    }
}
