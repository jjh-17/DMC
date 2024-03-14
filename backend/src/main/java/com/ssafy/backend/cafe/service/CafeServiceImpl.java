package com.ssafy.backend.cafe.service;


import com.ssafy.backend.cafe.model.domain.Bookmark;
import com.ssafy.backend.cafe.model.domain.CafeInfo;
import com.ssafy.backend.cafe.model.domain.CafeMenu;
import com.ssafy.backend.cafe.model.domain.TagCount;
import com.ssafy.backend.cafe.model.dto.ListCafeDto;
import com.ssafy.backend.cafe.model.mapping.DessertTagMapping;
import com.ssafy.backend.cafe.model.mapping.ListCafeMapping;
import com.ssafy.backend.cafe.model.repository.BookmarkRepository;
import com.ssafy.backend.cafe.model.repository.CafeInfoRepository;
import com.ssafy.backend.cafe.model.repository.CafeMenuRepository;
import com.ssafy.backend.cafe.model.repository.TagCountRepository;
import com.ssafy.backend.cafe.model.vo.CafeDetailVo;
import com.ssafy.backend.cafe.model.vo.CafeMenuVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CafeServiceImpl implements CafeService {

    @Autowired
    CafeInfoRepository cafeInfoRepository;

    @Autowired
    CafeMenuRepository cafeMenuRepository;

    @Autowired
    TagCountRepository tagCountRepository;

    @Autowired
    BookmarkRepository bookmarkRepository;

    @Override
    public Page<ListCafeMapping> cafeList(ListCafeDto listCafeDto, Pageable pageable) {
        return cafeInfoRepository.findAllIn500mOrderByDistance(listCafeDto.getLatitude(), listCafeDto.getLongitude(), pageable);
    }

    @Override
    public Page<ListCafeMapping> cafeSearch(ListCafeDto listCafeDto, String keyword, Pageable pageable) {
        keyword = "%" + keyword.replace(" ", "%") + "%";
        return cafeInfoRepository.findAllIn500mLikeKeywordOrderByDistance(listCafeDto.getLatitude(), listCafeDto.getLongitude(), keyword, pageable);
    }

    @Override
    public List<String> getDessertTag(Long cafeSeq) {
        List<DessertTagMapping> dessertTagMappingList = cafeMenuRepository.findAllDistinctDessertTagByCafeSeq(cafeSeq);

        if (dessertTagMappingList.isEmpty()) {
            return null;
        }

        return dessertTagMappingList.stream()
                .map(DessertTagMapping::getDessertTag)
                .toList();
    }

    @Override
    public List<String> getCafeTag(Long cafeSeq) {
        TagCount dmcTagCount = tagCountRepository.findByCafeSeqAndOwn(cafeSeq, true);

        if (dmcTagCount == null) {
            return null;
        }

        Map<String, Integer> tagCount = new HashMap<>();

        tagCount.put("tag1", Integer.parseInt(dmcTagCount.getTag1()));
        tagCount.put("tag2", Integer.parseInt(dmcTagCount.getTag2()));
        tagCount.put("tag3", Integer.parseInt(dmcTagCount.getTag3()));
        tagCount.put("tag4", Integer.parseInt(dmcTagCount.getTag4()));

        // Map의 값을 내림차순으로 정렬하고 상위 3개의 키를 추출한 List
        return tagCount.entrySet()
                .stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                .limit(3)
                .map(Map.Entry::getKey)
                .toList();
    }

    @Override
    public CafeDetailVo cafeDetail(Long cafeSeq) {
        CafeInfo cafeInfo = cafeInfoRepository.findByCafeSeq(cafeSeq);

        CafeDetailVo cafeDetailVo = new CafeDetailVo(cafeInfo.getCafeSeq(), cafeInfo.getName(), cafeInfo.getAddress(), cafeInfo.getImageUrl(), cafeInfo.getOpeningHour(), cafeInfo.getHomepageUrl(), cafeInfo.getUpdatedDate(), cafeInfo.getRating());

        return cafeDetailVo;
    }

    @Override
    public List<CafeMenuVo> cafeMenuDetail(Long cafeSeq) {
        List<CafeMenu> menuList = cafeMenuRepository.findByCafeSeq(cafeSeq);

        List<CafeMenuVo> list = new ArrayList<>();

        for (CafeMenu cafeMenu : menuList) {
            CafeMenuVo cafeMenuVo = new CafeMenuVo(cafeMenu.getName(), cafeMenu.getPrice(), cafeMenu.getImageUrl());

            list.add(cafeMenuVo);
        }

        return list;
    }

    @Override
    public void cafeBookmark(Long cafeSeq, Long memberSeq) {
        bookmarkRepository.save(Bookmark.builder().cafeSeq(cafeSeq).memberSeq(memberSeq).build());
    }

}
