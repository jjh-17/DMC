package com.ssafy.backend.cafe.model.repository;

import com.ssafy.backend.cafe.model.domain.CafeInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CafeInfoRepository extends JpaRepository<CafeInfo, Long> {

    Page<CafeInfo> findAllByRegionCodeAndIsDeletedFalse(String regionCode, Pageable pageable);

}
