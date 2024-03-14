package com.ssafy.backend.test;


import com.ssafy.backend.global.exception.BaseException;
import com.ssafy.backend.global.response.BaseResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.ssafy.backend.global.response.BaseResponseStatus.OOPS;

@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping("")
    public BaseResponse<?> test(){
        TestVo testVo = new TestVo();
        testVo.setName("강민정");
        throw new BaseException(OOPS);
//        return new BaseResponse<>(testVo);
    }
}

