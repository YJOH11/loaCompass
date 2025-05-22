package com.finalteam.loacompass.population.repository;

import com.finalteam.loacompass.population.entity.CharacterRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface CharacterRecordRepository extends JpaRepository<CharacterRecord, Long> {

    // 완전히 동일한 기록이 존재하는지 확인 (INSERT 전에 사용)
    @Query("""
        SELECT COUNT(r) > 0 FROM CharacterRecord r
        WHERE r.characterName = :characterName
        AND r.itemLevel = :itemLevel
        AND r.serverName = :serverName
        AND r.characterClass = :characterClass
    """)
    boolean existsExactRecord(
            @Param("characterName") String characterName,
            @Param("itemLevel") float itemLevel,
            @Param("serverName") String serverName,
            @Param("characterClass") String characterClass
    );

    // 오늘 기준 통계 (캐릭터 중복 제거)
    @Query("""
        SELECT r.serverName, COUNT(DISTINCT r.characterName)
        FROM CharacterRecord r
        WHERE DATE(r.recordedAt) = :date
        GROUP BY r.serverName
    """)
    List<Object[]> getServerPopulation(@Param("date") LocalDate date);

    @Query("""
        SELECT r.serverName, r.characterClass, COUNT(DISTINCT r.characterName)
        FROM CharacterRecord r
        WHERE DATE(r.recordedAt) = :date
        GROUP BY r.serverName, r.characterClass
    """)
    List<Object[]> getServerClassDistribution(@Param("date") LocalDate date);

    @Query("SELECT r FROM CharacterRecord r WHERE DATE(r.recordedAt) = :date ORDER BY r.itemLevel DESC LIMIT 1")
    Optional<CharacterRecord> findTopByRecordedAtOrderByItemLevelDesc(@Param("date") LocalDate date);

    @Query("SELECT r FROM CharacterRecord r WHERE DATE(r.recordedAt) = :date")
    List<CharacterRecord> findAllByRecordedAt(@Param("date") LocalDate date);

    //  누적 기준 통계 (캐릭터 중복 제거)
    @Query("""
        SELECT r.serverName, COUNT(DISTINCT r.characterName)
        FROM CharacterRecord r
        GROUP BY r.serverName
    """)
    List<Object[]> getTotalServerPopulation();

    @Query("""
        SELECT r.serverName, r.characterClass, COUNT(DISTINCT r.characterName)
        FROM CharacterRecord r
        GROUP BY r.serverName, r.characterClass
    """)
    List<Object[]> getTotalServerClassDistribution();

    @Query("SELECT r FROM CharacterRecord r ORDER BY r.itemLevel DESC LIMIT 1")
    Optional<CharacterRecord> findTopByOrderByItemLevelDesc();

    @Query("""
        SELECT r.characterClass, COUNT(DISTINCT r.characterName)
        FROM CharacterRecord r
        GROUP BY r.characterClass
    """)
    List<Object[]> getTotalClassDistribution();

    @Query("""
        SELECT 
        CASE 
            WHEN r.itemLevel < 1640 THEN '1640 미만' 
            WHEN r.itemLevel >= 1760 THEN '1760+' 
            ELSE CONCAT(CAST(FLOOR(r.itemLevel / 10) * 10 AS string), '-', CAST(FLOOR(r.itemLevel / 10) * 10 + 10 AS string)) 
        END AS levelRange, COUNT(DISTINCT r.characterName)
        FROM CharacterRecord r 
        GROUP BY 
        CASE 
            WHEN r.itemLevel < 1640 THEN '1640 미만' 
            WHEN r.itemLevel >= 1760 THEN '1760+' 
            ELSE CONCAT(CAST(FLOOR(r.itemLevel / 10) * 10 AS string), '-', CAST(FLOOR(r.itemLevel / 10) * 10 + 10 AS string)) 
        END
    """)
    List<Object[]> getTotalLevelRangeDistribution();

    Optional<CharacterRecord> findByCharacterName(String characterName);
}
