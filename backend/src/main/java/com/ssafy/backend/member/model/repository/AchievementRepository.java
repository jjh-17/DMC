package com.ssafy.backend.member.model.repository;

import com.ssafy.backend.member.model.domain.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AchievementRepository extends JpaRepository<Achievement, Long> {

}
