package com.ssafy.backend.test;


import com.ssafy.backend.cafe.service.CafeService;
import com.ssafy.backend.global.response.BaseResponse;
import com.ssafy.backend.global.util.S3UploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

import static com.ssafy.backend.global.response.BaseResponseStatus.SUCCESS;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    CafeService cafeService;

    @Autowired
    S3UploadUtil s3UploadUtil;

    @GetMapping("")
    public BaseResponse<?> test() {
        System.out.println(cafeService.getCafeTag(1L));
        return new BaseResponse<>(SUCCESS);
    }

    @PostMapping("")
    public BaseResponse<?> test(TestVo testVo) {
        System.out.println("testVo = " + testVo);
        try {
            s3UploadUtil.uploadReviewImage(testVo.getProfilePic(), 2L);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return new BaseResponse<>(SUCCESS);
    }

}

