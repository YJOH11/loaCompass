package com.finalteam.loacompass.population.repository;

import com.finalteam.loacompass.population.entity.CharacterRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface CharacterRecordRepository extends JpaRepository<CharacterRecord, Long> {

    // 오늘 기준
    boolean existsByCharacterNameAndRecordedAt(String characterName, LocalDate recordedAt);

    @Query("SELECT r.serverName, COUNT(r) FROM CharacterRecord r WHERE r.recordedAt = :date GROUP BY r.serverName")
    List<Object[]> getServerPopulation(@Param("date") LocalDate date);

    @Query("SELECT r.serverName, r.characterClass, COUNT(r) FROM CharacterRecord r WHERE r.recordedAt = :date GROUP BY r.serverName, r.characterClass")
    List<Object[]> getServerClassDistribution(@Param("date") LocalDate date);

    Optional<CharacterRecord> findTopByRecordedAtOrderByItemLevelDesc(LocalDate date);

    List<CharacterRecord> findAllByRecordedAt(LocalDate recordedAt);

    // 누적 기준 쿼리
    @Query("SELECT r.serverName, COUNT(r) FROM CharacterRecord r GROUP BY r.serverName")
    List<Object[]> getTotalServerPopulation();

    @Query("SELECT r.serverName, r.characterClass, COUNT(r) FROM CharacterRecord r GROUP BY r.serverName, r.characterClass")
    List<Object[]> getTotalServerClassDistribution();

    @Query("SELECT r FROM CharacterRecord r ORDER BY r.itemLevel DESC LIMIT 1")
    Optional<CharacterRecord> findTopByOrderByItemLevelDesc();

    @Query("SELECT r.characterClass, COUNT(r) FROM CharacterRecord r GROUP BY r.characterClass")
    List<Object[]> getTotalClassDistribution();

    @Query("""
        SELECT 
        CASE 
            WHEN r.itemLevel < 1640 THEN '1640 미만' 
            WHEN r.itemLevel >= 1760 THEN '1760+' 
            ELSE CONCAT(CAST(FLOOR(r.itemLevel / 10) * 10 AS string), '-', CAST(FLOOR(r.itemLevel / 10) * 10 + 10 AS string)) 
        END AS levelRange, COUNT(r) 
        FROM CharacterRecord r 
        GROUP BY 
        CASE 
            WHEN r.itemLevel < 1640 THEN '1640 미만' 
            WHEN r.itemLevel >= 1760 THEN '1760+' 
            ELSE CONCAT(CAST(FLOOR(r.itemLevel / 10) * 10 AS string), '-', CAST(FLOOR(r.itemLevel / 10) * 10 + 10 AS string)) 
        END
    """)
    List<Object[]> getTotalLevelRangeDistribution();
}
