package com.finalteam.loacompass.service;

import com.finalteam.loacompass.dto.LikeDto;
import com.finalteam.loacompass.mapper.LikeMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {

    private final LikeMapper likeMapper;

    @Override
    public boolean toggleLike(Long boardId, String userId) {
        LikeDto dto = new LikeDto(boardId, userId);
        if (likeMapper.exists(dto) > 0) {
            likeMapper.delete(dto);
            return false; // 좋아요 취소
        } else {
            likeMapper.insert(dto);
            return true; // 좋아요 등록
        }
    }

    @Override
    public int getLikesCount(Long boardId) {
        return likeMapper.count(boardId);
    }
}

