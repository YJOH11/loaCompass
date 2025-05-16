package com.finalteam.loacompass.util;

import java.util.Random;

public class NicknameGenerator {

    private static final Random random = new Random();

    //  가중치 반영된 초성 배열 (자주 쓰이는 자음 우선)
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
            'ㅋ','ㅌ','ㅍ'  // 낮은 빈도
    };

    //  가중치 반영된 중성 배열 (실제 사용 빈도 기준)
    private static final char[] WEIGHTED_JUNG = {
            'ㅏ','ㅏ','ㅏ','ㅏ','ㅓ','ㅓ','ㅓ',
            'ㅗ','ㅗ','ㅜ','ㅜ',
            'ㅡ','ㅡ','ㅣ','ㅣ',
            'ㅐ','ㅔ','ㅖ','ㅒ'
    };

    //  종성 배열 (받침은 없어도 됨)
    private static final char[] JONG = {
            '\0','\0','\0', // 받침 없음 확률 ↑
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

    public static String generatePatterned(int length) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            char cho = WEIGHTED_CHO[random.nextInt(WEIGHTED_CHO.length)];
            char jung = WEIGHTED_JUNG[random.nextInt(WEIGHTED_JUNG.length)];
            char jong = JONG[random.nextInt(JONG.length)];
            sb.append(makeHangul(cho, jung, jong));
        }
        return sb.toString();
    }

    public static String generatePatternedRandomLength() {
        return generatePatterned(2 + random.nextInt(5)); // 2~6자
    }
}
