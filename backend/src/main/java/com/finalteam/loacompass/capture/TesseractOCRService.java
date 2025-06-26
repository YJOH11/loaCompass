package com.finalteam.loacompass.capture;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.List;
import java.util.regex.*;

@Service
public class TesseractOCRService {


    public List<Map<String, String>> extractText(MultipartFile file) {
        List<Map<String, String>> resultList = new ArrayList<>();
        File tempFile = null;
        File preprocessedFile = null;

        try {
            tempFile = File.createTempFile("upload-", file.getOriginalFilename());
            file.transferTo(tempFile);

            BufferedImage originalImage = ImageIO.read(tempFile);
            BufferedImage binaryImage = new BufferedImage(
                    originalImage.getWidth(),
                    originalImage.getHeight(),
                    BufferedImage.TYPE_BYTE_BINARY
            );

            Graphics2D g = binaryImage.createGraphics();
            g.drawImage(originalImage, 0, 0, null);
            g.dispose();

            preprocessedFile = File.createTempFile("preprocessed-", ".png");
            ImageIO.write(binaryImage, "png", preprocessedFile);

            Tesseract tesseract = new Tesseract();

            String os = System.getProperty("os.name").toLowerCase();
            if (os.contains("win")) {
                tesseract.setDatapath("C:/Program Files/Tesseract-OCR");
            } else {
                tesseract.setDatapath("/home/ubuntu/Tesseract-OCR");
            }

            tesseract.setLanguage("kor+eng");

            String result = tesseract.doOCR(preprocessedFile);

            if (result == null || result.trim().isEmpty()) {
                resultList.add(Map.of("text", "감지된 글자가 없습니다."));
            } else {
                for (String line : result.split("\\r?\\n")) {
                    String cleaned = extractNickname(line);
                    if (!cleaned.isEmpty()) {
                        resultList.add(Map.of("text", cleaned));
                    }
                }
            }

        } catch (IOException | TesseractException e) {
            resultList.add(Map.of("text", "OCR 실패: " + e.getMessage()));
        } finally {
            if (tempFile != null) tempFile.delete();
            if (preprocessedFile != null) preprocessedFile.delete();
        }

        return resultList;
    }

    // 닉네임: 공백 없이 한글+영문 혼합 문자열 추출
    private String extractNickname(String input) {
        Matcher m = Pattern.compile("[a-zA-Z가-힣]+").matcher(input);
        StringBuilder sb = new StringBuilder();
        while (m.find()) {
            sb.append(m.group());
        }
        return sb.toString();
    }

}
