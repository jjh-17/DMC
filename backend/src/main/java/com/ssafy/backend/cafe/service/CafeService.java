package com.ssafy.backend.cafe.service;

import com.ssafy.backend.cafe.model.dto.ListCafeDto;
import com.ssafy.backend.cafe.model.mapping.ListCafeMapping;
import com.ssafy.backend.cafe.model.vo.CafeDetailVo;
import com.ssafy.backend.cafe.model.vo.CafeMenuVo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CafeService {
    Page<ListCafeMapping> cafeList(ListCafeDto listCafeDto, Pageable pageable);

    List<String> getDessertTag(Long cafeSeq);

    List<String> getCafeTag(Long cafeSeq);

    CafeDetailVo cafeDetail(Long cafeSeq);

    List<CafeMenuVo> cafeMenuDetail(Long cafeSeq);

    Page<ListCafeMapping> cafeSearch(ListCafeDto listCafeDto, String keyword, Pageable pageable);

    void cafeBookmark(Long cafeSeq, Long memberSeq);

    void cafeBookmarkCancel(Long cafeSeq, Long memberSeq);

    boolean bookmarkCheck(Long cafeSeq, Long memberSeq);

    boolean cafeCheck(Long cafeSeq);
}
