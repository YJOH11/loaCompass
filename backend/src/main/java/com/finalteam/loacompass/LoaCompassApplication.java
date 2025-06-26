package com.finalteam.loacompass;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.mybatis.spring.annotation.MapperScan;

@SpringBootApplication
@EnableScheduling
@MapperScan(basePackages = "com.finalteam.loacompass.mapper")
public class LoaCompassApplication {
    public static void main(String[] args) {
        SpringApplication.run(LoaCompassApplication.class, args);
    }
}