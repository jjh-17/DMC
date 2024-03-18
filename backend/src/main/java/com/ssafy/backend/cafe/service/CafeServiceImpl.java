package com.ssafy.backend.cafe.service;


import com.ssafy.backend.cafe.model.domain.Bookmark;
import com.ssafy.backend.cafe.model.domain.CafeInfo;
import com.ssafy.backend.cafe.model.domain.CafeMenu;
import com.ssafy.backend.cafe.model.domain.TagCount;
import com.ssafy.backend.cafe.model.dto.CurrentLocationDto;
import com.ssafy.backend.cafe.model.mapping.CafeBookmarkListMapping;
import com.ssafy.backend.cafe.model.mapping.CafeListMapping;
import com.ssafy.backend.cafe.model.mapping.CafeSeqMapping;
import com.ssafy.backend.cafe.model.mapping.DessertTagMapping;
import com.ssafy.backend.cafe.model.repository.BookmarkRepository;
import com.ssafy.backend.cafe.model.repository.CafeInfoRepository;
import com.ssafy.backend.cafe.model.repository.CafeMenuRepository;
import com.ssafy.backend.cafe.model.repository.TagCountRepository;
import com.ssafy.backend.cafe.model.vo.CafeDetailVo;
import com.ssafy.backend.cafe.model.vo.CafeMenuVo;
import com.ssafy.backend.global.exception.BaseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

import static com.ssafy.backend.global.response.BaseResponseStatus.*;

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
    public Page<CafeListMapping> cafeList(CurrentLocationDto currentLocationDto, Pageable pageable) {
        return cafeInfoRepository.findAllIn500mOrderByDistance(currentLocationDto.getLatitude(), currentLocationDto.getLongitude(), pageable);
    }

    @Override
    public Page<CafeListMapping> cafeSearch(CurrentLocationDto currentLocationDto, String keyword, Pageable pageable) {
        keyword = "%" + keyword.replace(" ", "%") + "%";
        return cafeInfoRepository.findAllIn500mLikeKeywordOrderByDistance(currentLocationDto.getLatitude(), currentLocationDto.getLongitude(), keyword, pageable);
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
        Optional<CafeInfo> cafeInfoOptional = cafeInfoRepository.findById(cafeSeq);

        if (cafeInfoOptional.isEmpty()) {
            throw new BaseException(NOT_VALID_CAFE);
        }

        CafeInfo cafeInfo = cafeInfoOptional.get();

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
        Optional<Bookmark> bookmarkOptional = bookmarkRepository.findByCafeSeqAndMemberSeq(cafeSeq, memberSeq);

        if (bookmarkOptional.isPresent()) { // 이미 북마크 한 카페일 때
            throw new BaseException(EXIST_BOOKMARK);
        }

        bookmarkRepository.save(Bookmark.builder().cafeSeq(cafeSeq).memberSeq(memberSeq).build());
    }

    @Override
    public void cafeBookmarkCancel(Long cafeSeq, Long memberSeq) {
        Optional<Bookmark> bookmarkOptional = bookmarkRepository.findByCafeSeqAndMemberSeq(cafeSeq, memberSeq);

        if (bookmarkOptional.isEmpty()) { // 북마크 안한 카페를 취소하려고 했을 때
            throw new BaseException(NOT_VALID_BOOKMARK_CANCEL);
        }

        bookmarkRepository.delete(bookmarkOptional.get());
    }

    @Override
    public boolean bookmarkCheck(Long cafeSeq, Long memberSeq) {
        return bookmarkRepository.existsByCafeSeqAndMemberSeq(cafeSeq, memberSeq);
    }

    @Override
    public boolean isCafeNotExist(Long cafeSeq) {
        return !cafeInfoRepository.existsById(cafeSeq);
    }

    @Override
    public Page<CafeSeqMapping> bookmarkCafeSeqList(Long memberSeq, Pageable pageable) {
        return bookmarkRepository.findAllByMemberSeq(memberSeq, pageable);
    }

    @Override
    public CafeBookmarkListMapping cafeBookmarkList(Long cafeSeq) {
        CafeBookmarkListMapping cafeBookmarkListMapping = cafeInfoRepository.findByCafeSeq(cafeSeq);

        if (cafeBookmarkListMapping == null) {
            throw new BaseException(NOT_VALID_CAFE);
        }

        return cafeBookmarkListMapping;
    }

    @Override
    public List<CafeListMapping> cafeTagRecommendList(List<String> preferTag, CurrentLocationDto currentLocationDto) {
        List<CafeListMapping> cafeListMappings = cafeInfoRepository.findAllIn500mOrderByDistance(currentLocationDto.getLatitude(), currentLocationDto.getLongitude());

        PriorityQueue<CafeListMapping> cafeTagQueue = new PriorityQueue<>(Comparator
                .comparingInt((CafeListMapping o) -> -getIntersectionCount(o.getTop_tag(), preferTag))
                .thenComparingDouble(CafeListMapping::getDistance));

        for (CafeListMapping cafeListMapping : cafeListMappings) {
            cafeTagQueue.offer(cafeListMapping);
        }

        List<CafeListMapping> recommendedCafes = new ArrayList<>();

        for (int i = 0; i < 5 && !cafeTagQueue.isEmpty(); i++) {
            recommendedCafes.add(cafeTagQueue.poll());
        }

        return recommendedCafes;
    }

    private int getIntersectionCount(String s1, List<String> tagList) {
        String[] tokens = (s1 != null) ? s1.split(", ") : new String[0];
        int count = 0;
        for (String token : tokens) {
            if (tagList.contains(token)) {
                count++;
            }
        }
        return count;
    }

}
