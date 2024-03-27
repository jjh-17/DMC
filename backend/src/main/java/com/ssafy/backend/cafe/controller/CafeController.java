package com.ssafy.backend.cafe.controller;

import com.ssafy.backend.cafe.model.dto.CurrentLocationDto;
import com.ssafy.backend.cafe.model.dto.FilterDto;
import com.ssafy.backend.cafe.model.vo.CafeDetailVo;
import com.ssafy.backend.cafe.model.vo.CafeListVo;
import com.ssafy.backend.cafe.model.vo.CafeMenuVo;
import com.ssafy.backend.cafe.service.CafeFacade;
import com.ssafy.backend.cafe.service.CafeService;
import com.ssafy.backend.global.response.BaseResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static com.ssafy.backend.global.response.BaseResponseStatus.SUCCESS;

@RestController
@RequestMapping("/api/cafes")
public class CafeController {

    @Autowired
    CafeService cafeService;

    @Autowired
    CafeFacade cafeFacade;

    // 사용자의 현위치를 기반으로 사용자 반경 500m안의 카페 목록 가까운 순 제공
    // 검색어 입력 시 검색한 결과 제공
    @GetMapping
    public BaseResponse<?> cafeList(@RequestParam(name = "latitude") double latitude, @RequestParam(name = "longitude") double longitude, @RequestParam(name = "keyword", defaultValue = "") String keyword, @RequestParam(name = "page", defaultValue = "1") int page) {
        Pageable pageable = PageRequest.of(page - 1, 10);

        CurrentLocationDto currentLocationDto = new CurrentLocationDto(latitude, longitude);

        Map<String, Object> list = cafeFacade.cafeList(currentLocationDto, pageable, keyword);

        return new BaseResponse<>(SUCCESS, list);
    }

    @PostMapping
    public BaseResponse<?> cafeListFilter(@RequestParam(name = "latitude") double latitude, @RequestParam(name = "longitude") double longitude, @RequestParam(name = "keyword", defaultValue = "") String keyword, @RequestParam(name = "page", defaultValue = "1") int page, @RequestBody FilterDto filterDto) {
        Pageable pageable = PageRequest.of(page - 1, 10);

        CurrentLocationDto currentLocationDto = new CurrentLocationDto(latitude, longitude);

        Map<String, Object> list = cafeFacade.cafeFilter(currentLocationDto, pageable, keyword, filterDto);

        return new BaseResponse<>(SUCCESS, list);
    }

    // 카페 상세 페이지 들어갔을 때 보이는 카페 정보 조회
    @GetMapping("/{cafeSeq}")
    public BaseResponse<CafeDetailVo> cafeDetail(HttpServletRequest request, @PathVariable Long cafeSeq) {
//        Long memberSeq = (Long) request.getAttribute("seq");
        Long memberSeq = 1L;
        CafeDetailVo cafeDetailVo = cafeFacade.cafeDetail(cafeSeq, memberSeq);

        return new BaseResponse<>(SUCCESS, cafeDetailVo);
    }

    // 카페 상세 페이지에 있는 메뉴 목록 조회
    @GetMapping("/{cafeSeq}/menus")
    public BaseResponse<List<CafeMenuVo>> cafeMenuDetail(HttpServletRequest request, @PathVariable Long cafeSeq) {
        List<CafeMenuVo> list = cafeService.cafeMenuDetail(cafeSeq);

        return new BaseResponse<>(SUCCESS, list);
    }

    // 카페 북마크 하기
    @PostMapping("{cafeSeq}/bookmark")
    public BaseResponse<?> cafeBookmark(HttpServletRequest request, @PathVariable Long cafeSeq) {
//        Long memberSeq = (Long) request.getAttribute("seq");
        Long memberSeq = 1L;
        cafeFacade.cafeBookmark(cafeSeq, memberSeq);

        return new BaseResponse<>(SUCCESS);
    }

    // 카페 북마크 취소
    @DeleteMapping("{cafeSeq}/bookmark")
    public BaseResponse<?> cafeBookmarkCancel(HttpServletRequest request, @PathVariable Long cafeSeq) {
//        Long memberSeq = (Long) request.getAttribute("seq");
        Long memberSeq = 1L;
        cafeFacade.cafeBookmarkCancel(cafeSeq, memberSeq);

        return new BaseResponse<>(SUCCESS);
    }

    // 카페 북마크 목록 조회
    @GetMapping("bookmark")
    public BaseResponse<?> cafeBookmarkList(HttpServletRequest request, @RequestParam(name = "page", defaultValue = "1") int page) {
//        Long memberSeq = (Long) request.getAttribute("seq");
        Long memberSeq = 1L;
        Pageable pageable = PageRequest.of(page - 1, 10);

        Map<String, Object> list = cafeFacade.cafeBookmarkList(memberSeq, pageable);

        return new BaseResponse<>(SUCCESS, list);
    }

    // 사용자 선호 태그를 포함하고 있는 카페를 거리순 5개 반환
    @GetMapping("mytag")
    public BaseResponse<?> cafeTagRecommend(HttpServletRequest request, @RequestParam(name = "latitude") double latitude, @RequestParam(name = "longitude") double longitude) {
//        Long memberSeq = (Long) request.getAttribute("seq");
        Long memberSeq = 1L;

        CurrentLocationDto currentLocationDto = new CurrentLocationDto(latitude, longitude);

        List<CafeListVo> list = cafeFacade.cafeTagRecommendList(memberSeq, currentLocationDto);

        return new BaseResponse<>(SUCCESS, list);
    }

    // 나와 선호 태그가 같은 사용자가 5점을 준 카페 5개 반환
    @GetMapping("myinfo")
    public BaseResponse<?> cafeInfoRecommend(HttpServletRequest request, @RequestParam(name = "latitude") double latitude, @RequestParam(name = "longitude") double longitude) {
//        Long memberSeq = (Long) request.getAttribute("seq");
        Long memberSeq = 1L;

        CurrentLocationDto currentLocationDto = new CurrentLocationDto(latitude, longitude);

        List<CafeListVo> list = cafeFacade.cafeInfoRecommendList(memberSeq, currentLocationDto);

        return new BaseResponse<>(SUCCESS, list);
    }

    // 내가 5점을 준 카페와 비슷한 카페 5개 반환
    @GetMapping("myrating")
    public BaseResponse<?> cafeRatingRecommend(HttpServletRequest request, @RequestParam(name = "latitude") double latitude, @RequestParam(name = "longitude") double longitude) {
//        Long memberSeq = (Long) request.getAttribute("seq");
        Long memberSeq = 1L;

        CurrentLocationDto currentLocationDto = new CurrentLocationDto(latitude, longitude);

        Map<String, Object> resultMap = cafeFacade.cafeRatingRecommendList(memberSeq, currentLocationDto);

        return new BaseResponse<>(SUCCESS, resultMap);
    }

}
