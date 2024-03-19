package com.ssafy.backend.test;


import com.ssafy.backend.cafe.service.CafeService;
import com.ssafy.backend.global.exception.BaseException;
import com.ssafy.backend.global.response.BaseResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.ssafy.backend.global.response.BaseResponseStatus.OOPS;
import static com.ssafy.backend.global.response.BaseResponseStatus.SUCCESS;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    CafeService cafeService;

    @GetMapping("")
    public BaseResponse<?> test(){
        System.out.println(cafeService.getCafeTag(1L));
        return new BaseResponse<>(SUCCESS);
    }
}

