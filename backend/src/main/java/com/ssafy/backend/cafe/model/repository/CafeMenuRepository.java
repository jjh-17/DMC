package com.ssafy.backend.cafe.model.repository;

import com.ssafy.backend.cafe.model.domain.CafeMenu;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CafeMenuRepository extends JpaRepository<CafeMenu, Long> {

}
