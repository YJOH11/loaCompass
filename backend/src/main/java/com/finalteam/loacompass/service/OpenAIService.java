package com.finalteam.loacompass.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.theokanning.openai.OpenAiHttpException;
import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatCompletionResult;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.service.OpenAiService;

import lombok.extern.slf4j.Slf4j;
import retrofit2.HttpException;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class OpenAIService {

    private final OpenAiService openAiService;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final int MAX_RETRIES = 3;
    private final int INITIAL_RETRY_DELAY_MS = 1000;

    public OpenAIService(@Value("${openai.api.key}") String apiKey) {
        // 60초 타임아웃으로 OpenAiService 인스턴스 생성
        this.openAiService = new OpenAiService(apiKey, Duration.ofSeconds(60));
    }

    public String generateJobRecommendation(String mbti) throws Exception {
        int retries = 0;
        int retryDelay = INITIAL_RETRY_DELAY_MS;

        while (true) {
            try {
                List<ChatMessage> messages = new ArrayList<>();

                // 시스템 메시지 추가
                ChatMessage systemMessage = new ChatMessage("system",
                        "당신은 로스트아크 게임 전문가이자 MBTI 성격 유형에 따른 직업 추천을 해주는 도우미입니다. " +
                                "로스트아크의 다양한 직업(클래스)의 특성과 MBTI 성격 유형을 잘 이해하고 있습니다.");

                // 사용자 메시지 추가
                ChatMessage userMessage = new ChatMessage("user",
                        "MBTI가 " + mbti + "인 사람에게 어울리는 로스트아크 직업 3개를 추천해주세요. " +
                                "각 직업에 대한 이유와 그 직업의 특징을 간략히 설명해주세요. " +
                                "JSON 형식으로 recommendedJobs 배열과 explanation 문자열로 응답해주세요.");

                messages.add(systemMessage);
                messages.add(userMessage);

                // 채팅 완성 요청 생성
                ChatCompletionRequest request = ChatCompletionRequest.builder()
                        .model("gpt-3.5-turbo")
                        .messages(messages)
                        .temperature(0.7)
                        .maxTokens(1000)
                        .build();

                // API 호출
                ChatCompletionResult response = openAiService.createChatCompletion(request);
                String content = response.getChoices().get(0).getMessage().getContent();

                return content;
            } catch (Exception e) {
                // API 할당량 초과 확인 (할당량 초과는 재시도해도 의미 없음)
                if (e instanceof OpenAiHttpException && e.getMessage().contains("exceeded your current quota")) {
                    log.error("OpenAI API 할당량을 초과했습니다. 결제 정보를 확인하세요.");
                    throw new Exception("OpenAI API 할당량 초과로 서비스를 이용할 수 없습니다. 기본 추천을 제공합니다.");
                }

                // 429 에러(Too Many Requests) 확인
                if (e.getCause() instanceof HttpException && ((HttpException) e.getCause()).code() == 429) {
                    if (retries < MAX_RETRIES) {
                        retries++;
                        log.warn("OpenAI API 속도 제한에 걸렸습니다. {}초 후 재시도합니다. (재시도 {}/{})",
                                retryDelay / 1000, retries, MAX_RETRIES);

                        try {
                            Thread.sleep(retryDelay);
                            // 지수 백오프 전략 적용: 다음 대기 시간을 2배로 늘림
                            retryDelay *= 2;
                        } catch (InterruptedException ie) {
                            Thread.currentThread().interrupt();
                            throw new Exception("재시도 대기 중 인터럽트 발생");
                        }
                    } else {
                        log.error("OpenAI API 속도 제한 재시도 횟수 초과: {}", MAX_RETRIES);
                        throw new Exception("일시적인 API 제한으로 서비스 이용이 불가합니다. 기본 추천을 제공합니다.");
                    }
                } else {
                    log.error("OpenAI API 호출 중 오류 발생", e);
                    throw new Exception("API 호출 중 오류가 발생했습니다. 기본 추천을 제공합니다.");
                }
            }
        }
    }
}