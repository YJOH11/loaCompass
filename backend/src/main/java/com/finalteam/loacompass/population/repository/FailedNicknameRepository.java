package com.finalteam.loacompass.population.repository;

import com.finalteam.loacompass.population.entity.FailedNickname;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FailedNicknameRepository extends JpaRepository<FailedNickname, String> {
    boolean existsByNickname(String nickname);
}
