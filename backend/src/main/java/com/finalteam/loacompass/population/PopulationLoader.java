//package com.finalteam.loacompass.population;
//
//import com.fasterxml.jackson.databind.JsonNode;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.finalteam.loacompass.population.dto.PopulationDto;
//import org.springframework.core.io.ClassPathResource;
//import org.springframework.stereotype.Component;
//
//import java.io.InputStream;
//import java.util.Arrays;
//import java.util.List;
//
//@Component
//public class PopulationLoader {
//
//    public List<PopulationDto> loadFromSampleJson() {
//        try {
//            ObjectMapper objectMapper = new ObjectMapper();
//            InputStream is = new ClassPathResource("sample/population_sample.json").getInputStream();
//
//            JsonNode root = objectMapper.readTree(is);
//            JsonNode krNode = root.get("KR");
//
//            PopulationDto[] result = objectMapper.treeToValue(krNode, PopulationDto[].class);
//            return Arrays.asList(result);
//
//        } catch (Exception e) {
//            throw new RuntimeException("예제 JSON 로딩 실패", e);
//        }
//    }
//}
