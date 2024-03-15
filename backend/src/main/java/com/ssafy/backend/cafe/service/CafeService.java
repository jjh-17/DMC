package com.ssafy.backend.cafe.service;

import com.ssafy.backend.cafe.model.dto.CurrentLocationDto;
import com.ssafy.backend.cafe.model.mapping.CafeBookmarkListMapping;
import com.ssafy.backend.cafe.model.mapping.CafeListMapping;
import com.ssafy.backend.cafe.model.mapping.CafeSeqMapping;
import com.ssafy.backend.cafe.model.vo.CafeDetailVo;
import com.ssafy.backend.cafe.model.vo.CafeMenuVo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CafeService {
    Page<CafeListMapping> cafeList(CurrentLocationDto currentLocationDto, Pageable pageable);

    List<String> getDessertTag(Long cafeSeq);

    List<String> getCafeTag(Long cafeSeq);

    CafeDetailVo cafeDetail(Long cafeSeq);

    List<CafeMenuVo> cafeMenuDetail(Long cafeSeq);

    Page<CafeListMapping> cafeSearch(CurrentLocationDto currentLocationDto, String keyword, Pageable pageable);

    void cafeBookmark(Long cafeSeq, Long memberSeq);

    void cafeBookmarkCancel(Long cafeSeq, Long memberSeq);

    boolean bookmarkCheck(Long cafeSeq, Long memberSeq);

    boolean isCafeNotExist(Long cafeSeq);

    Page<CafeSeqMapping> bookmarkCafeSeqList(Long memberSeq, Pageable pageable);

    CafeBookmarkListMapping cafeBookmarkList(Long cafeSeq);
}
