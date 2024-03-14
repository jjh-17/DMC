package com.ssafy.backend.cafe.service;

import com.ssafy.backend.cafe.model.dto.ListCafeDto;
import com.ssafy.backend.cafe.model.mapping.ListCafeMapping;
import com.ssafy.backend.cafe.model.vo.CafeDetailVo;
import com.ssafy.backend.cafe.model.vo.ListCafeVo;
import com.ssafy.backend.global.exception.BaseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static com.ssafy.backend.global.response.BaseResponseStatus.NOT_VALID_CAFE;

@Service
public class CafeFacade {

    @Autowired
    CafeService cafeService;

    @Transactional
    public List<ListCafeVo> cafeList(ListCafeDto listCafeDto, Pageable pageable, String keyword) {
        List<ListCafeVo> list = new ArrayList<>();
        Page<ListCafeMapping> cafeMappingList;
        if (keyword.isEmpty()) {
            cafeMappingList = cafeService.cafeList(listCafeDto, pageable);
        } else {
            cafeMappingList = cafeService.cafeSearch(listCafeDto, keyword, pageable);
        }

        for (ListCafeMapping listCafeMapping : cafeMappingList) {
            List<String> tagList = cafeService.getCafeTag(listCafeMapping.getCafe_seq());

            List<String> dessertTag = cafeService.getDessertTag(listCafeMapping.getCafe_seq());

            // Todo : 영업 시간으로 영업 중 여부 계산(영업시간 없으면 null)
            String openingHour = listCafeMapping.getOpeningHour();
            Boolean isOpen = null;

            ListCafeVo listCafeVo = new ListCafeVo(listCafeMapping.getCafe_seq(), listCafeMapping.getName(), listCafeMapping.getAddress(), listCafeMapping.getImage_url(), listCafeMapping.getDistance(), tagList, dessertTag, isOpen);
            list.add(listCafeVo);
        }

        return list;
    }

    @Transactional
    public CafeDetailVo cafeDetail(Long cafeSeq, Long memberSeq) {
        CafeDetailVo cafeDetailVo = cafeService.cafeDetail(cafeSeq);

        cafeDetailVo.setTag(cafeService.getCafeTag(cafeSeq));

        // Todo : memberSeq가 유효한지 확인하는 로직 필요
        if (!cafeService.cafeCheck(cafeSeq)) {
            throw new BaseException(NOT_VALID_CAFE);
        }
        cafeDetailVo.setBookmarked(cafeService.bookmarkCheck(cafeSeq, memberSeq));

        return cafeDetailVo;
    }

    @Transactional
    public void cafeBookmark(Long cafeSeq, Long memberSeq) {
        // Todo : memberSeq가 유효한지 확인하는 로직 필요
        if (!cafeService.cafeCheck(cafeSeq)) {
            throw new BaseException(NOT_VALID_CAFE);
        }
        cafeService.cafeBookmark(cafeSeq, memberSeq);
    }

    @Transactional
    public void cafeBookmarkCancel(Long cafeSeq, Long memberSeq) {
        // Todo : memberSeq가 유효한지 확인하는 로직 필요
        if (!cafeService.cafeCheck(cafeSeq)) {
            throw new BaseException(NOT_VALID_CAFE);
        }
        cafeService.cafeBookmarkCancel(cafeSeq, memberSeq);
    }
}
