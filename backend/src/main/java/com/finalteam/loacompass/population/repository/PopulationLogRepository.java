package com.finalteam.loacompass.population.repository;

import com.finalteam.loacompass.population.entity.PopulationLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface PopulationLogRepository extends JpaRepository<PopulationLog, Long> {

    @Query("SELECT p FROM PopulationLog p WHERE p.recordedAt = (SELECT MAX(p2.recordedAt) FROM PopulationLog p2)")
    List<PopulationLog> findLatestSnapshot();

    List<PopulationLog> findAllByRecordedAt(LocalDateTime recordedAt);

    List<PopulationLog> findAllByServerNameOrderByRecordedAtAsc(String serverName);

    @Query("""
  SELECT p FROM PopulationLog p
  WHERE p.recordedAt = (SELECT MAX(p2.recordedAt) FROM PopulationLog p2)
  ORDER BY p.population DESC
""")
    List<PopulationLog> findRankedSnapshot();
}