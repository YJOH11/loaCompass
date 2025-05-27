package com.finalteam.loacompass.mapper;

import com.finalteam.loacompass.dto.BoardDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BoardMapper {
    BoardDto findById(Long id);
    List<BoardDto> findAll();
    int insert(BoardDto board);
    int update(BoardDto board);
    int delete(Long id);

    int likeBoard(@Param("boardId") Long boardId, @Param("ipAddress") String ip);
    int unlikeBoard(@Param("boardId") Long boardId, @Param("ipAddress") String ip);
    boolean hasLiked(@Param("boardId") Long boardId, @Param("ipAddress") String ip);
}



