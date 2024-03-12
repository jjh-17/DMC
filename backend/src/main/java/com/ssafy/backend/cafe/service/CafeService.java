package com.ssafy.backend.cafe.service;

import com.ssafy.backend.cafe.model.dto.ListCafeDto;
import com.ssafy.backend.cafe.model.vo.ListCafeVo;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CafeService {
    List<ListCafeVo> cafeList(ListCafeDto listCafeDto, Pageable pageable);
}
