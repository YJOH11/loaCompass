package com.finalteam.loacompass.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;

import com.finalteam.loacompass.service.SassagaeService;
import com.finalteam.loacompass.dto.SassagaePostDto;

@Service
public class SassagaeServiceImpl implements SassagaeService {

    private static final Logger logger = LoggerFactory.getLogger(SassagaeServiceImpl.class);
    private static final String PYTHON_PATH = "python"; // 또는 "python3"
    private static final String SCRIPT_PATH = "scraper/inven_search.py";

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public List<SassagaePostDto> searchPosts(String keyword, String searchType, int maxConcurrent) {
        List<SassagaePostDto> results = new ArrayList<>();

        try {
            // 임시 테스트 데이터 반환
            return createDummyResults(keyword);

            /*
             * // Python 스크립트 실행을 위한 명령어 구성
             * ProcessBuilder pb = new ProcessBuilder(
             * PYTHON_PATH,
             * SCRIPT_PATH,
             * "--keyword", keyword,
             * "--search-type", searchType,
             * "--max-concurrent", String.valueOf(maxConcurrent),
             * "--json-output"
             * );
             * 
             * pb.redirectErrorStream(true);
             * Process process = pb.start();
             * 
             * // 프로세스 출력 읽기
             * StringBuilder output = new StringBuilder();
             * try (BufferedReader reader = new BufferedReader(
             * new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8))) {
             * String line;
             * while ((line = reader.readLine()) != null) {
             * output.append(line).append("\n");
             * }
             * }
             * 
             * // 프로세스 종료 대기 (10분 타임아웃)
             * boolean completed = process.waitFor(10, TimeUnit.MINUTES);
             * 
             * if (!completed) {
             * logger.error("Python script execution timed out");
             * process.destroyForcibly();
             * throw new RuntimeException("Python script execution timed out");
             * }
             * 
             * int exitCode = process.exitValue();
             * if (exitCode == 0) {
             * // 성공적으로 실행된 경우 JSON 파싱
             * String jsonOutput = output.toString().trim();
             * 
             * // JSON 배열이 있는지 확인
             * if (jsonOutput.startsWith("[") && jsonOutput.endsWith("]")) {
             * results = objectMapper.readValue(jsonOutput, new
             * TypeReference<List<SassagaePostDto>>() {});
             * logger.info("Successfully parsed {} search results", results.size());
             * } else {
             * logger.error("Invalid JSON output from Python script: {}", jsonOutput);
             * }
             * } else {
             * logger.error("Python script execution failed with exit code {}: {}",
             * exitCode, output);
             * throw new RuntimeException("Python script execution failed with exit code " +
             * exitCode);
             * }
             */
        } catch (Exception e) {
            logger.error("Error executing Python script", e);
            throw new RuntimeException("Error executing Python script: " + e.getMessage(), e);
        }
    }

    // 키워드에 따른 더미 데이터 생성
    private List<SassagaePostDto> createDummyResults(String keyword) {
        List<SassagaePostDto> dummyResults = new ArrayList<>();

        // 키워드가 포함된 제목이 있으면 우선 추가
        if (keyword != null && !keyword.isEmpty()) {
            dummyResults.add(SassagaePostDto.builder()
                    .title(keyword + "에 관한 최신 정보")
                    .server("니나브")
                    .author("검색테스터")
                    .date("2023-08-10")
                    .views("3456")
                    .link("https://www.inven.co.kr/board/lostark/5355/100001")
                    .content("이 게시글은 " + keyword + "에 관한 정보를 담고 있습니다.")
                    .build());
        }

        // 기본 더미 데이터 추가
        dummyResults.add(SassagaePostDto.builder()
                .title("로스트아크 1.7 대업데이트 내용 정리")
                .server("니나브")
                .author("아크라시아")
                .date("2023-08-01")
                .views("1234")
                .link("https://www.inven.co.kr/board/lostark/5355/100002")
                .content("이것은 더미 내용입니다.")
                .build());

        dummyResults.add(SassagaePostDto.builder()
                .title("[실리안] 길드원 모집합니다")
                .server("실리안")
                .author("길드마스터")
                .date("2023-08-02")
                .views("567")
                .link("https://www.inven.co.kr/board/lostark/5355/100003")
                .content("이것은 더미 내용입니다.")
                .build());

        dummyResults.add(SassagaePostDto.builder()
                .title("골드 파밍 꿀팁 공유")
                .server("카단")
                .author("골드러버")
                .date("2023-08-03")
                .views("2345")
                .link("https://www.inven.co.kr/board/lostark/5355/100004")
                .content("이것은 더미 내용입니다.")
                .build());

        dummyResults.add(SassagaePostDto.builder()
                .title("[카제로스] 레이드 파티 구합니다")
                .server("카제로스")
                .author("레이더")
                .date("2023-08-04")
                .views("789")
                .link("https://www.inven.co.kr/board/lostark/5355/100005")
                .content("이것은 더미 내용입니다.")
                .build());

        dummyResults.add(SassagaePostDto.builder()
                .title("신규 클래스 정보 유출")
                .server("아브렐슈드")
                .author("정보통")
                .date("2023-08-05")
                .views("5678")
                .link("https://www.inven.co.kr/board/lostark/5355/100006")
                .content("이것은 더미 내용입니다.")
                .build());

        return dummyResults;
    }
}