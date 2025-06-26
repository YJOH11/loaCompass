package com.finalteam.loacompass.clearrecord.repository;

import com.finalteam.loacompass.clearrecord.entity.ClearRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ClearRecordRepository extends JpaRepository<ClearRecord, Long> {

    Optional<ClearRecord> findTopByBossOrderByClearTimeAsc(String boss);

    @Query(value = """
    SELECT m.job, COUNT(*), AVG(TIME_TO_SEC(STR_TO_DATE(r.clear_time, '%i:%s')))
    FROM clear_party_member m
    JOIN clear_record r ON m.clear_record_id = r.id
    WHERE r.boss = :boss
    GROUP BY m.job
    ORDER BY AVG(TIME_TO_SEC(STR_TO_DATE(r.clear_time, '%i:%s')))
""", nativeQuery = true)
    List<Object[]> findJobStatsByBoss(@Param("boss") String boss);

}