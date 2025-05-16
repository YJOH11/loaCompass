package com.finalteam.loacompass;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class LoaCompassApplication {
    public static void main(String[] args) {
        SpringApplication.run(LoaCompassApplication.class, args);
    }
}
