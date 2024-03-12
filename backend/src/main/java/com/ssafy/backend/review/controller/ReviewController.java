package com.ssafy.backend.review.controller;

import com.ssafy.backend.review.model.dto.AddReviewDto;
import com.ssafy.backend.review.model.dto.UpdateReviewDto;
import com.ssafy.backend.review.service.ReviewFacade;
import com.ssafy.backend.review.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private ReviewFacade reviewFacade;

    /*
     * 리뷰 작성하기
     */
    @PostMapping("/cafe/{cafeid}")
    public void addReview(@PathVariable("cafeid") Long cafeSeq, @RequestBody Map<String, Object> body) {
        // Long membersSeq = (Long) request.getAttribute("seq");
        Long memberSeq = 1L;
        AddReviewDto addReviewDto = new AddReviewDto(memberSeq, cafeSeq, (String) body.get("content"), (List<String>) body.get("tag"), (Integer) body.get("rating"));
        List<String> imageUrls = (List<String>) body.get("imageUrls");
        if (imageUrls != null) {
            reviewFacade.addReview(addReviewDto, imageUrls);
        } else {
            reviewService.addReview(addReviewDto);
        }
    }

    /*
     * 리뷰 수정하기
     */
    @PatchMapping("/cafe/{reviewid}")
    public void updateReview(@PathVariable("reviewid") Long reviewSeq, @RequestBody Map<String, Object> body) {
        // Long membersSeq = (Long) request.getAttribute("seq");
        Long memberSeq = 1L;
        UpdateReviewDto updateReviewDto = new UpdateReviewDto(reviewSeq, memberSeq, (String) body.get("content"), (List<String>) body.get("tag"), (Integer) body.get("rating"));
        List<String> imageUrls = (List<String>) body.get("imageUrls");
        reviewFacade.updateReview(updateReviewDto, imageUrls);
//        reviewService.updateReview(updateReviewDto);
    }
}
