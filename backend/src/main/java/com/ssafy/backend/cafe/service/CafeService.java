package com.ssafy.backend.cafe.service;

import com.ssafy.backend.cafe.model.dto.ListCafeDto;
import com.ssafy.backend.cafe.model.mapping.ListCafeMapping;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CafeService {
    Page<ListCafeMapping> cafeList(ListCafeDto listCafeDto, Pageable pageable);

    List<String> getDessertTag(Long cafeSeq);

    List<String> getCafeTag(Long cafeSeq);
}
