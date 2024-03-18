package com.ssafy.backend.cafe.model.repository;

import com.ssafy.backend.cafe.model.domain.CafeMenu;
import com.ssafy.backend.cafe.model.mapping.DessertTagMapping;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CafeMenuRepository extends JpaRepository<CafeMenu, Long> {

    List<DessertTagMapping> findAllDistinctDessertTagByCafeSeq(Long cafeSeq);

    List<CafeMenu> findByCafeSeq(Long cafeSeq);

}
