package com.ssafy.backend.cafe.service;


import com.ssafy.backend.cafe.model.domain.*;
import com.ssafy.backend.cafe.model.dto.AddTagCountDto;
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
import com.ssafy.backend.global.util.TagUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.swing.text.html.HTML;
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
        TagCount dmcTagCount = tagCountRepository.findById(new TagCountId(cafeSeq, true)).orElse(null);
        TagCount platformTagCount = tagCountRepository.findById(new TagCountId(cafeSeq, false)).orElse(null);
        Map<String, Long> tag = new HashMap<>();

        if (dmcTagCount != null) {
            TagUtil.tagPutUtil(tag, dmcTagCount);
        }
        if (platformTagCount != null) {
            TagUtil.tagPutUtil(tag, platformTagCount);
        }

        // Map의 값을 내림차순으로 정렬하고 상위 3개의 키를 추출한 List
        return tag.entrySet()
                .stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
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
    public void addTagCount(AddTagCountDto addTagCountDto) {
        TagCountId id = new TagCountId(addTagCountDto.getCafeSeq(), addTagCountDto.isOwn());
        TagCount tagCount = tagCountRepository.findById(id).orElse(null);
        if (tagCount == null) {
            tagCount = new TagCount(id, 0L, 0L, 0L, 0L, 0L, 0L, 0L, 0L, 0L, 0L, 0L, 0L, 0L, 0L);
            tagCountRepository.save(tagCount);
            tagCount = tagCountRepository.findById(id).orElseThrow(() -> (new BaseException(OOPS)));
        }
        for (String tagName : addTagCountDto.getTagList()) {
            TagUtil.tagCountUtil(tagCount, tagName);
        }
        tagCountRepository.save(tagCount);
    }
}
