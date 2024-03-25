package com.ssafy.backend.member.model.repository;

import com.ssafy.backend.member.model.domain.MileageLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MileageLogRepository extends JpaRepository<MileageLog, Long> {
}
