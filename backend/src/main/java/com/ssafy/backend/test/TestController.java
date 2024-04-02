package com.ssafy.backend.test;


import com.ssafy.backend.cafe.service.CafeService;
import com.ssafy.backend.global.response.BaseResponse;
import com.ssafy.backend.global.util.S3UploadUtil;
import com.ssafy.backend.review.model.dto.AddReviewDto;
import com.ssafy.backend.review.model.dto.ReviewRequestDto;
import com.ssafy.backend.review.service.ReviewFacade;
import com.ssafy.backend.review.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.ssafy.backend.global.response.BaseResponseStatus.SUCCESS;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    CafeService cafeService;

    @Autowired
    S3UploadUtil s3UploadUtil;

    @Autowired
    ReviewService reviewService;

    @Autowired
    ReviewFacade reviewFacade;

    @GetMapping("")
    public BaseResponse<?> test() {
        System.out.println(cafeService.getCafeTag(1L));
        return new BaseResponse<>(SUCCESS);
    }

    @PostMapping("test")
    public BaseResponse<?> test_fastapi(@RequestBody ReviewRequestDto reviewRequestDto) {
        System.out.println(reviewRequestDto);
        Long memberSeq = 1L;
        Long cafeSeq = 1L;
        List<String> list = reviewFacade.addReview(new AddReviewDto(reviewRequestDto.getReviewImages(), memberSeq, cafeSeq, reviewRequestDto.getContent(), reviewRequestDto.getTag(), reviewRequestDto.getRating()));

        return new BaseResponse<>(SUCCESS, list);
    }

}

