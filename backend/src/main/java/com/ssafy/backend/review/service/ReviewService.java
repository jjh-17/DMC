package com.ssafy.backend.review.service;

import com.ssafy.backend.review.model.dto.AddReviewDto;
import com.ssafy.backend.review.model.dto.UpdateReviewDto;
import com.ssafy.backend.review.model.vo.ViewReviewVo;

import java.util.List;

public interface ReviewService {
    List<ViewReviewVo> viewReview(Long cafeSeq);

    List<ViewReviewVo> viewMemberReview(Long memberSeq);

    List<String> getImageUrl(Long reviewSeq);

    Long addReview(AddReviewDto addReviewDto);

    void addReviewImage(Long reviewSeq, List<String> images);

    void updateReview(UpdateReviewDto updateReviewDto);

    void updateReviewImage(Long reviewSeq, List<String> imageUrls);

    void deleteReview(Long reviewSeq);
}
