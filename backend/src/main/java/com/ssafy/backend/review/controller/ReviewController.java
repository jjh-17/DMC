package com.ssafy.backend.review.controller;

import com.ssafy.backend.cafe.model.dto.AddTagCountDto;
import com.ssafy.backend.cafe.service.CafeService;
import com.ssafy.backend.global.response.BaseResponse;
import com.ssafy.backend.review.model.dto.AddReviewDto;
import com.ssafy.backend.review.model.dto.LikeReivewDto;
import com.ssafy.backend.review.model.dto.UpdateReviewDto;
import com.ssafy.backend.review.model.vo.ViewReviewVo;
import com.ssafy.backend.review.service.ReviewFacade;
import com.ssafy.backend.review.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
        Long memberSeq = 1L;
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
        Long membersSeq = 1L;
        List<ViewReviewVo> reviews = reviewFacade.viewLikeReview(membersSeq);
        return new BaseResponse<>(reviews);
    }

    /*
     * 리뷰 좋아요하기
     */
    @PostMapping("/cafe/like")
    public BaseResponse<?> likeReview(@RequestParam(value="reviewid") Long reviewSeq) {
        // Long membersSeq = (Long) request.getAttribute("seq");
        Long membersSeq = 1L;
        reviewService.likeReview(new LikeReivewDto(membersSeq, reviewSeq));
        return new BaseResponse<>(SUCCESS);
    }

    /*
     * 리뷰 좋아요 취소
     */
    @DeleteMapping("/cafe/like")
    public BaseResponse<?> dislikeReview(@RequestParam(value="reviewid") Long reviewSeq) {
        // Long membersSeq = (Long) request.getAttribute("seq");
        Long membersSeq = 1L;
        reviewService.dislikeReview(new LikeReivewDto(membersSeq, reviewSeq));
        return new BaseResponse<>(SUCCESS);
    }

    /*
     * 리뷰 작성하기
     */
    @PostMapping("/cafe/{cafeid}")
    public BaseResponse<?> addReview(@PathVariable("cafeid") Long cafeSeq, @RequestBody Map<String, Object> body) {
        // Long membersSeq = (Long) request.getAttribute("seq");
        Long memberSeq = 1L;
        AddReviewDto addReviewDto = new AddReviewDto(memberSeq, cafeSeq, (String) body.get("content"), (List<String>) body.get("tag"), (Integer) body.get("rating"));
        List<String> imageUrls = (List<String>) body.get("imageUrls");
        List<String> tagList = addReviewDto.getTag();
        reviewFacade.addReview(addReviewDto, imageUrls, tagList);
        return new BaseResponse<>(SUCCESS);
    }

    /*
     * 리뷰 수정하기
     */
    @PatchMapping("/cafe/{reviewid}")
    public BaseResponse<?> updateReview(@PathVariable("reviewid") Long reviewSeq, @RequestBody Map<String, Object> body) {
        // Long membersSeq = (Long) request.getAttribute("seq");
        Long memberSeq = 1L;
        UpdateReviewDto updateReviewDto = new UpdateReviewDto(reviewSeq, memberSeq, (String) body.get("content"), (List<String>) body.get("tag"), (Integer) body.get("rating"));
        List<String> imageUrls = (List<String>) body.get("imageUrls");
        List<String> newTagList = updateReviewDto.getTag();
        reviewFacade.updateReview(updateReviewDto, imageUrls, newTagList);
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
