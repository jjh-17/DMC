package com.ssafy.backend.cafe.controller;

import com.ssafy.backend.cafe.model.dto.ListCafeDto;
import com.ssafy.backend.cafe.model.vo.ListCafeVo;
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

    // 사용자의 현 위치를 기반으로 한 카페 목록 조회
    @GetMapping
    public BaseResponse<?> cafeList(@RequestBody ListCafeDto listCafeDto, @RequestParam(name="page", defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(page, 10);
        List<ListCafeVo> list = cafeService.cafeList(listCafeDto, pageable);

        return new BaseResponse<>(SUCCESS, list);
    }

}
