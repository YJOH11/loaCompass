package com.finalteam.loacompass.util;

import java.util.Random;

public class NicknameGenerator {

    private static final Random random = new Random();

    // 실제로 자주 쓰이는 한글 음절 리스트 (1~2글자 이름 기반)
    private static final String[] COMMON_SYLLABLES = {
            "하", "도", "윤", "빛", "나", "리", "수", "준", "민", "유", "라", "은",
            "별", "서", "재", "예", "태", "진", "아", "성", "지", "현", "우"
    };

    // 자주 쓰이는 접미어 (닉네임 스타일)
    private static final String[] COMMON_SUFFIXES = {
            "", "123", "99", "01", "x", "tv", "_", "zz", "ss", "god", "king", "pro", "님", "짱", "찐", "왕"
    };

    // 가중치 기반 초성 (빈도순)
    private static final char[] WEIGHTED_CHO = {
            'ㅇ','ㅇ','ㅇ','ㅇ','ㅇ',
            'ㅅ','ㅅ','ㅅ','ㅅ',
            'ㄱ','ㄱ','ㄱ','ㄱ',
            'ㅈ','ㅈ','ㅈ',
            'ㅊ','ㅊ',
            'ㅎ','ㅎ',
            'ㅁ','ㅁ',
            'ㄴ','ㄴ',
            'ㄷ','ㄷ',
            'ㅂ','ㅂ',
            'ㅋ','ㅌ','ㅍ'
    };

    private static final char[] WEIGHTED_JUNG = {
            'ㅏ','ㅏ','ㅏ','ㅏ','ㅓ','ㅓ','ㅓ',
            'ㅗ','ㅗ','ㅜ','ㅜ',
            'ㅡ','ㅡ','ㅣ','ㅣ',
            'ㅐ','ㅔ','ㅖ','ㅒ'
    };

    private static final char[] JONG = {
            '\0','\0','\0',
            'ㄱ','ㄴ','ㄹ','ㅁ','ㅂ','ㅅ'
    };

    private static final String CHO_LIST = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
    private static final String JUNG_LIST = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";
    private static final String JONG_LIST = "\0ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ";

    private static int choIndex(char c) {
        return CHO_LIST.indexOf(c);
    }

    private static int jungIndex(char c) {
        return JUNG_LIST.indexOf(c);
    }

    private static int jongIndex(char c) {
        return JONG_LIST.indexOf(c);
    }

    private static char makeHangul(char cho, char jung, char jong) {
        int base = 0xAC00;
        int choIdx = choIndex(cho);
        int jungIdx = jungIndex(jung);
        int jongIdx = jongIndex(jong);
        return (char)(base + (choIdx * 21 * 28) + (jungIdx * 28) + jongIdx);
    }

    // 1. 완전 랜덤 조합 (기존 방식)
    public static String generatePureRandom(int length) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            char cho = WEIGHTED_CHO[random.nextInt(WEIGHTED_CHO.length)];
            char jung = WEIGHTED_JUNG[random.nextInt(WEIGHTED_JUNG.length)];
            char jong = JONG[random.nextInt(JONG.length)];
            sb.append(makeHangul(cho, jung, jong));
        }
        return sb.toString();
    }

    // 2. 고빈도 음절 기반 + 접미어
    public static String generateFromCommonSyllables() {
        String first = COMMON_SYLLABLES[random.nextInt(COMMON_SYLLABLES.length)];
        String second = COMMON_SYLLABLES[random.nextInt(COMMON_SYLLABLES.length)];
        String suffix = COMMON_SUFFIXES[random.nextInt(COMMON_SUFFIXES.length)];
        return first + second + suffix;
    }

    // 3. 섞어서 생성: 한글 2~3자 + 영문/숫자
    public static String generateMixedNickname() {
        int length = 2 + random.nextInt(2); // 2~3 글자
        String hangulPart = generatePureRandom(length);
        String suffix = COMMON_SUFFIXES[random.nextInt(COMMON_SUFFIXES.length)];
        return hangulPart + suffix;
    }

    // 4. 현실성 높은 추천 닉네임 (위 방식 중 랜덤 선택)
    public static String generateRealisticNickname() {
        int mode = random.nextInt(3);
        return switch (mode) {
            case 0 -> generateFromCommonSyllables();
            case 1 -> generateMixedNickname();
            default -> generatePureRandom(2 + random.nextInt(3));
        };
    }
}
