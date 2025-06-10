package com.finalteam.loacompass.mapper;

import com.finalteam.loacompass.dto.LikeDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface LikeMapper {
    void insert(LikeDto likeDto);
    void delete(LikeDto likeDto);
    int exists(LikeDto likeDto);
    int count(@Param("boardId") Long boardId);
}

