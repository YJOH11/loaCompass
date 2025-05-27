package com.finalteam.loacompass;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.mybatis.spring.annotation.MapperScan;

@SpringBootApplication
@MapperScan(basePackages = "com.finalteam.loacompass.mapper")
public class LoaCompassApplication {
    public static void main(String[] args) {
        SpringApplication.run(LoaCompassApplication.class, args);
    }
}

