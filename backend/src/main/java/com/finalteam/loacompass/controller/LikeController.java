package com.finalteam.loacompass.controller;

import com.finalteam.loacompass.service.LikeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

    private final LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    // 게시글 좋아요 토글
    @PostMapping("/toggle")
    public ResponseEntity<?> toggleLike(
            @RequestParam Long boardId,
            @RequestParam String userId) {

        boolean liked = likeService.toggleLike(boardId, userId);
        return ResponseEntity.ok().body(
                liked ? "좋아요 등록됨" : "좋아요 취소됨"
        );
    }

    // 게시글 좋아요 수 조회
    @GetMapping("/count")
    public ResponseEntity<Integer> getLikesCount(@RequestParam Long boardId) {
        int count = likeService.getLikesCount(boardId);
        return ResponseEntity.ok(count);
    }
}
