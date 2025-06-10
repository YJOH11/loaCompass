package com.finalteam.loacompass.clearrecord.repository;

import com.finalteam.loacompass.clearrecord.entity.ClearRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClearRecordRepository extends JpaRepository<ClearRecord, Long> {

    Optional<ClearRecord> findTopByBossOrderByClearTimeAsc(String boss);

}