package com.finalteam.loacompass.population.repository;

import com.finalteam.loacompass.population.entity.CharacterRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface CharacterRecordRepository extends JpaRepository<CharacterRecord, Long> {
    boolean existsByCharacterNameAndRecordedAt(String characterName, LocalDate recordedAt);

    @Query("SELECT r.serverName, COUNT(r) FROM CharacterRecord r WHERE r.recordedAt = :date GROUP BY r.serverName")
    List<Object[]> getServerPopulation(@Param("date") LocalDate date);

    @Query("SELECT r.serverName, r.characterClass, COUNT(r) FROM CharacterRecord r WHERE r.recordedAt = :date GROUP BY r.serverName, r.characterClass")
    List<Object[]> getServerClassDistribution(@Param("date") LocalDate date);

    Optional<CharacterRecord> findTopByRecordedAtOrderByItemLevelDesc(LocalDate date);
}

