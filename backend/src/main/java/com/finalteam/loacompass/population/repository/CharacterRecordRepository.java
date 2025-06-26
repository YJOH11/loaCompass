package com.finalteam.loacompass.population.repository;

import com.finalteam.loacompass.population.entity.CharacterRecord;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface CharacterRecordRepository extends JpaRepository<CharacterRecord, Long> {

    boolean existsByCharacterNameAndItemLevelAndServerNameAndCharacterClass(
            String characterName,
            float itemLevel,
            String serverName,
            String characterClass
    );

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

    @Query("""
        SELECT r FROM CharacterRecord r
        WHERE r.itemLevel = (
            SELECT MAX(r2.itemLevel) FROM CharacterRecord r2
        )
        ORDER BY r.recordedAt DESC
    """)
    Optional<CharacterRecord> findLatestTopCharacter();

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

    Optional<CharacterRecord> findTopByCharacterNameOrderByRecordedAtDesc(String characterName);

    Optional<CharacterRecord> findTopByCharacterImageIsNotNullOrderByItemLevelDescRecordedAtDesc();

    // Top N 유저 (이미지가 있는 경우)
    @Query("""
        SELECT r FROM CharacterRecord r
        WHERE r.characterImage IS NOT NULL
        ORDER BY r.itemLevel DESC, r.recordedAt DESC
    """)
    List<CharacterRecord> findTopCharactersWithImage(Pageable pageable);

    @Query(value = """
    SELECT cr.*
    FROM character_record cr
    JOIN (
        SELECT character_name, MAX(recorded_at) AS latest_time
        FROM character_record
        GROUP BY character_name
    ) latest
    ON cr.character_name = latest.character_name
    AND cr.recorded_at = latest.latest_time
    ORDER BY cr.item_level DESC
    LIMIT 50
    """, nativeQuery = true)
    List<CharacterRecord> findTop50LatestRecords();

    }
