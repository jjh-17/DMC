package com.ssafy.backend.cafe.controller;

import com.ssafy.backend.cafe.model.dto.ListCafeDto;
import com.ssafy.backend.cafe.model.vo.CafeDetailVo;
import com.ssafy.backend.cafe.model.vo.CafeMenuVo;
import com.ssafy.backend.cafe.model.vo.ListCafeVo;
import com.ssafy.backend.cafe.service.CafeFacade;
import com.ssafy.backend.cafe.service.CafeService;
import com.ssafy.backend.global.response.BaseResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.ssafy.backend.global.response.BaseResponseStatus.SUCCESS;

@RestController
@RequestMapping("/api/cafes")
public class CafeController {

    @Autowired
    CafeService cafeService;

    @Autowired
    CafeFacade cafeFacade;

    // 사용자의 현위치를 기반으로 사용자 반경 500m안의 카페 목록 가까운 순 제공
    @GetMapping
    public BaseResponse<List<ListCafeVo>> cafeList(@RequestBody ListCafeDto listCafeDto, @RequestParam(name = "page", defaultValue = "1") int page) {
        Pageable pageable = PageRequest.of(page - 1, 10);

        List<ListCafeVo> list = cafeFacade.cafeList(listCafeDto, pageable);

        return new BaseResponse<>(SUCCESS, list);
    }

    // 카페 상세 페이지 들어갔을 때 보이는 카페 정보 조회
    @GetMapping("/{cafeSeq}")
    public BaseResponse<CafeDetailVo> cafeDetail(@PathVariable Long cafeSeq) {
        CafeDetailVo cafeDetailVo = cafeFacade.cafeDetail(cafeSeq);

        return new BaseResponse<>(SUCCESS, cafeDetailVo);
    }

    // 카페 상세 페이지에 있는 메뉴 목록 조회
    @GetMapping("/{cafeSeq}/menus")
    public BaseResponse<List<CafeMenuVo>> cafeMenuDetail(@PathVariable Long cafeSeq) {
        List<CafeMenuVo> list = cafeService.cafeMenuDetail(cafeSeq);

        return new BaseResponse<>(SUCCESS, list);
    }

}
