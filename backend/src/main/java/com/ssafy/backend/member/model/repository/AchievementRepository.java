package com.ssafy.backend.member.model.repository;

import com.ssafy.backend.member.model.domain.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AchievementRepository extends JpaRepository<Achievement, Long> {
    List<Achievement> findByMemberSeq(Long memberSeq);
}
