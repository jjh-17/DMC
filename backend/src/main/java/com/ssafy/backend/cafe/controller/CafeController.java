package com.ssafy.backend.cafe.controller;

import com.ssafy.backend.cafe.model.dto.ListCafeDto;
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
    public BaseResponse<?> cafeList(@RequestBody ListCafeDto listCafeDto, @RequestParam(name = "page", defaultValue = "1") int page) {
        Pageable pageable = PageRequest.of(page - 1, 10);

        List<ListCafeVo> list = cafeFacade.cafeList(listCafeDto, pageable);

        return new BaseResponse<>(SUCCESS, list);
    }

}
