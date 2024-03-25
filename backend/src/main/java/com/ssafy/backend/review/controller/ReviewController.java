package com.ssafy.backend.review.controller;

import com.ssafy.backend.global.response.BaseResponse;
import com.ssafy.backend.review.model.dto.AddReviewDto;
import com.ssafy.backend.review.model.dto.ReviewRequestDto;
import com.ssafy.backend.review.model.dto.LikeReivewDto;
import com.ssafy.backend.review.model.dto.UpdateReviewDto;
import com.ssafy.backend.review.model.vo.ViewReviewVo;
import com.ssafy.backend.review.service.ReviewFacade;
import com.ssafy.backend.review.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

import static com.ssafy.backend.global.response.BaseResponseStatus.SUCCESS;


@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private ReviewFacade reviewFacade;

    /*
     * 카페의 전체 리뷰 조회하기
     */
    @GetMapping("/cafe/{cafeid}")
    public BaseResponse<?> viewCafeReview(@PathVariable("cafeid") Long cafeSeq) {
        // Long membersSeq = (Long) request.getAttribute("seq");
        Long memberSeq = 2L;
        List<ViewReviewVo> reviews = reviewFacade.viewCafeReview(cafeSeq, memberSeq);
        return new BaseResponse<>(reviews);
    }

    /*
     * 사용자의 전체 리뷰 조회하기
     */
    @GetMapping("/member/{memeberid}")
    public BaseResponse<?> viewMemberReview(@PathVariable("memeberid") Long memberSeq) {
        List<ViewReviewVo> reviews = reviewFacade.viewMemberReview(memberSeq);
        return new BaseResponse<>(reviews);
    }

    /*
     * 좋아요한 리뷰 조회하기
     */
    @GetMapping("/member/like")
    public BaseResponse<?> viewLikeReview() {
        // Long membersSeq = (Long) request.getAttribute("seq");
        Long membersSeq = 2L;
        List<ViewReviewVo> reviews = reviewFacade.viewLikeReview(membersSeq);
        return new BaseResponse<>(reviews);
    }

    /*
     * 리뷰 좋아요하기
     */
    @PostMapping("/cafe/like")
    public BaseResponse<?> likeReview(@RequestParam(value = "reviewid") Long reviewSeq) {
        // Long membersSeq = (Long) request.getAttribute("seq");
        Long membersSeq = 2L;
        reviewService.likeReview(new LikeReivewDto(membersSeq, reviewSeq));
        return new BaseResponse<>(SUCCESS);
    }

    /*
     * 리뷰 좋아요 취소
     */
    @DeleteMapping("/cafe/like")
    public BaseResponse<?> dislikeReview(@RequestParam(value = "reviewid") Long reviewSeq) {
        // Long membersSeq = (Long) request.getAttribute("seq");
        Long membersSeq = 2L;
        reviewService.dislikeReview(new LikeReivewDto(membersSeq, reviewSeq));
        return new BaseResponse<>(SUCCESS);
    }

    /*
     * 리뷰 작성하기
     */
    @PostMapping("/cafe/{cafeid}")
    public BaseResponse<?> addReview(@PathVariable("cafeid") Long cafeSeq, ReviewRequestDto reviewRequestDto) {
        // Long membersSeq = (Long) request.getAttribute("seq");
        Long memberSeq = 2L;
        List<String> list = reviewFacade.addReview(new AddReviewDto(reviewRequestDto.getReviewImages(), memberSeq, cafeSeq, reviewRequestDto.getContent(), reviewRequestDto.getTag(), reviewRequestDto.getRating()));
        return new BaseResponse<>(SUCCESS, list);
    }

    /*
     * 리뷰 수정하기
     */
    @PatchMapping("/cafe/{reviewid}")
    public BaseResponse<?> updateReview(@PathVariable("reviewid") Long reviewSeq, ReviewRequestDto reviewRequestDto) {
        // Long membersSeq = (Long) request.getAttribute("seq");
        Long memberSeq = 2L;
        reviewFacade.updateReview(new UpdateReviewDto(reviewRequestDto.getReviewImages(), reviewSeq, memberSeq, reviewRequestDto.getContent(), reviewRequestDto.getTag(), reviewRequestDto.getRating()));
        return new BaseResponse<>(SUCCESS);
    }

    /*
     * 리뷰 삭제하기
     */
    @DeleteMapping("/cafe/{reviewid}")
    public BaseResponse<?> deleteReview(@PathVariable("reviewid") Long reviewSeq) {
        // Long membersSeq = (Long) request.getAttribute("seq");
        reviewFacade.deleteReview(reviewSeq);
        return new BaseResponse<>(SUCCESS);
    }

}
