package com.ssafy.backend.review.controller;

import com.ssafy.backend.global.response.BaseResponse;
import com.ssafy.backend.review.model.dto.AddReviewDto;
import com.ssafy.backend.review.model.dto.LikeReivewDto;
import com.ssafy.backend.review.model.dto.ReviewRequestDto;
import com.ssafy.backend.review.model.dto.UpdateReviewDto;
import com.ssafy.backend.review.model.vo.ViewReviewVo;
import com.ssafy.backend.review.service.ReviewFacade;
import com.ssafy.backend.review.service.ReviewService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public BaseResponse<?> viewCafeReview(HttpServletRequest request, @PathVariable("cafeid") Long cafeSeq) {
        Long memberSeq = (Long) request.getAttribute("seq");
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
     * 나의 전체 리뷰 조회하기
     */
    @GetMapping("/member/myreview")
    public BaseResponse<?> viewMyReview(HttpServletRequest request) {
        Long memberSeq = (Long) request.getAttribute("seq");
        List<ViewReviewVo> reviews = reviewFacade.viewMemberReview(memberSeq);
        return new BaseResponse<>(reviews);
    }

    /*
     * 좋아요한 리뷰 조회하기
     */
    @GetMapping("/member/like")
    public BaseResponse<?> viewLikeReview(HttpServletRequest request) {
        Long memberSeq = (Long) request.getAttribute("seq");
        List<ViewReviewVo> reviews = reviewFacade.viewLikeReview(memberSeq);
        return new BaseResponse<>(reviews);
    }

    /*
     * 리뷰 좋아요하기
     */
    @PostMapping("/cafe/like")
    public BaseResponse<?> likeReview(HttpServletRequest request, @RequestParam(value = "reviewid") Long reviewSeq) {
        Long memberSeq = (Long) request.getAttribute("seq");
        reviewService.likeReview(new LikeReivewDto(memberSeq, reviewSeq));
        return new BaseResponse<>(SUCCESS);
    }

    /*
     * 리뷰 좋아요 취소
     */
    @DeleteMapping("/cafe/like")
    public BaseResponse<?> dislikeReview(HttpServletRequest request, @RequestParam(value = "reviewid") Long reviewSeq) {
        Long memberSeq = (Long) request.getAttribute("seq");
        reviewService.dislikeReview(new LikeReivewDto(memberSeq, reviewSeq));
        return new BaseResponse<>(SUCCESS);
    }

    /*
     * 리뷰 작성하기
     */
    @PostMapping("/cafe/{cafeid}")
    public BaseResponse<?> addReview(HttpServletRequest request, @PathVariable("cafeid") Long cafeSeq, ReviewRequestDto reviewRequestDto) {
        Long memberSeq = (Long) request.getAttribute("seq");
        List<String> list = reviewFacade.addReview(new AddReviewDto(reviewRequestDto.getReviewImages(), memberSeq, cafeSeq, reviewRequestDto.getContent(), reviewRequestDto.getTag(), reviewRequestDto.getRating()));
        return new BaseResponse<>(SUCCESS, list);
    }

    /*
     * 리뷰 수정하기
     */
    @PatchMapping("/cafe/{reviewid}")
    public BaseResponse<?> updateReview(HttpServletRequest request, @PathVariable("reviewid") Long reviewSeq, ReviewRequestDto reviewRequestDto) {
        Long memberSeq = (Long) request.getAttribute("seq");
        reviewFacade.updateReview(new UpdateReviewDto(reviewRequestDto.getReviewImages(), reviewSeq, memberSeq, reviewRequestDto.getContent(), reviewRequestDto.getTag(), reviewRequestDto.getRating()));
        return new BaseResponse<>(SUCCESS);
    }

    /*
     * 리뷰 삭제하기
     */
    @DeleteMapping("/cafe/{reviewid}")
    public BaseResponse<?> deleteReview(HttpServletRequest request, @PathVariable("reviewid") Long reviewSeq) {
        Long memberSeq = (Long) request.getAttribute("seq");
        reviewFacade.deleteReview(reviewSeq);
        return new BaseResponse<>(SUCCESS);
    }

}
