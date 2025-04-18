package com.finalteam.loacompass.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;

@RestController
public class test {

    @Autowired
    private DataSource dataSource;

    @GetMapping("/api/db-test2")
    public String testConnection() {
        try (Connection conn = dataSource.getConnection()) {
            return " DB 연결 성공! URL: " + conn.getMetaData().getURL();
        } catch (Exception e) {
            return " DB 연결 !!!!실패!!!!: " + e.getMessage();
        }
    }
}
