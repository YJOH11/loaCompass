package com.finalteam.loacompass.service;

public interface LikeService {
    boolean toggleLike(Long boardId, String userId);
    int getLikesCount(Long boardId);
}


