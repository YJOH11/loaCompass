package com.finalteam.loacompass.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.finalteam.loacompass.dto.MbtiJobRequest;
import com.finalteam.loacompass.dto.MbtiJobResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MbtiJobService {

    private final OpenAIService openAIService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public MbtiJobResponse recommendJobsByMbti(MbtiJobRequest request) {
        String mbti = request.getMbti().toUpperCase();

        // MBTI 형식 검증
        validateMbti(mbti);

        try {
            // OpenAI API를 통해 직업 추천 생성
            String aiResponse = openAIService.generateJobRecommendation(mbti);

            try {
                // JSON 응답 파싱
                JsonNode jsonNode = objectMapper.readTree(aiResponse);

                List<String> recommendedJobs;
                String explanation;

                // 표준 JSON 형식으로 응답이 왔는지 확인
                if (jsonNode.has("recommendedJobs") && jsonNode.has("explanation")) {
                    // JSON 객체에서 값 추출
                    JsonNode jobsNode = jsonNode.get("recommendedJobs");
                    recommendedJobs = objectMapper.convertValue(jobsNode, List.class);
                    explanation = jsonNode.get("explanation").asText();
                } else {
                    // 텍스트 형식으로 온 경우 예상되는 응답 형식
                    log.warn("AI 응답이 예상된 JSON 형식이 아닙니다: {}", aiResponse);
                    recommendedJobs = getMbtiDefaultJobs(mbti);
                    explanation = "AI 응답을 파싱할 수 없습니다. MBTI 유형에 맞는 기본 추천 직업을 제공합니다.";
                }

                return MbtiJobResponse.builder()
                        .mbti(mbti)
                        .recommendedJobs(recommendedJobs)
                        .explanation(explanation)
                        .build();
            } catch (Exception e) {
                log.error("AI 응답 파싱 중 오류 발생", e);
                return getDefaultResponse(mbti, "AI 응답 파싱 중 오류가 발생했습니다.");
            }
        } catch (Exception e) {
            log.error("OpenAI API 호출 중 오류 발생: {}", e.getMessage());

            String errorMessage;
            if (e.getMessage().contains("할당량 초과")) {
                errorMessage = "OpenAI API 할당량 초과로 AI 추천을 제공할 수 없습니다. MBTI 기반 기본 추천을 제공합니다.";
            } else if (e.getMessage().contains("API 제한")) {
                errorMessage = "일시적인 API 제한으로 AI 추천을 제공할 수 없습니다. MBTI 기반 기본 추천을 제공합니다.";
            } else {
                errorMessage = "AI 서비스 일시적 오류로 MBTI 기반 기본 추천을 제공합니다.";
            }

            return getDefaultResponse(mbti, errorMessage);
        }
    }

    private MbtiJobResponse getDefaultResponse(String mbti, String errorMessage) {
        return MbtiJobResponse.builder()
                .mbti(mbti)
                .recommendedJobs(getMbtiDefaultJobs(mbti))
                .explanation(errorMessage)
                .build();
    }

    private List<String> getMbtiDefaultJobs(String mbti) {
        // MBTI 유형별 기본 추천 직업
        switch (mbti) {
            case "ISTJ":
                return Arrays.asList("건슬링어", "워로드", "디스트로이어");
            case "ISFJ":
                return Arrays.asList("홀리나이트", "바드", "도화가");
            case "INFJ":
                return Arrays.asList("바드", "도화가", "소서리스");
            case "INTJ":
                return Arrays.asList("소서리스", "아르카나", "데빌헌터");
            case "ISTP":
                return Arrays.asList("스트라이커", "블레이드", "디스트로이어");
            case "ISFP":
                return Arrays.asList("도화가", "기공사", "블레이드");
            case "INFP":
                return Arrays.asList("도화가", "바드", "서머너");
            case "INTP":
                return Arrays.asList("소서리스", "데모닉", "건슬링어");
            case "ESTP":
                return Arrays.asList("버서커", "스트라이커", "브레이커");
            case "ESFP":
                return Arrays.asList("리퍼", "워로드", "기공사");
            case "ENFP":
                return Arrays.asList("기공사", "바드", "소울이터");
            case "ENTP":
                return Arrays.asList("소서리스", "데모닉", "리퍼");
            case "ESTJ":
                return Arrays.asList("워로드", "블래스터", "건슬링어");
            case "ESFJ":
                return Arrays.asList("바드", "홀리나이트", "워로드");
            case "ENFJ":
                return Arrays.asList("바드", "소울이터", "홀리나이트");
            case "ENTJ":
                return Arrays.asList("워로드", "블레이드", "건슬링어");
            default:
                return Arrays.asList("버서커", "소서리스", "바드");
        }
    }

    private void validateMbti(String mbti) {
        if (mbti.length() != 4) {
            throw new IllegalArgumentException("MBTI는 4글자여야 합니다.");
        }

        String[] validFirstChars = { "I", "E" };
        String[] validSecondChars = { "S", "N" };
        String[] validThirdChars = { "T", "F" };
        String[] validFourthChars = { "J", "P" };

        if (!contains(validFirstChars, mbti.substring(0, 1)) ||
                !contains(validSecondChars, mbti.substring(1, 2)) ||
                !contains(validThirdChars, mbti.substring(2, 3)) ||
                !contains(validFourthChars, mbti.substring(3, 4))) {
            throw new IllegalArgumentException("유효하지 않은 MBTI 형식입니다.");
        }
    }

    private boolean contains(String[] array, String value) {
        for (String s : array) {
            if (s.equals(value)) {
                return true;
            }
        }
        return false;
    }
}