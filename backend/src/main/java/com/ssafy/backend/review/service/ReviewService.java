package com.ssafy.backend.review.service;

import com.ssafy.backend.review.model.dto.AddReviewDto;
import com.ssafy.backend.review.model.dto.UpdateReviewDto;

import java.util.List;

public interface ReviewService {
    Long addReview(AddReviewDto addReviewDto);

    void addReviewImage(Long reviewSeq, List<String> images);

    void updateReview(UpdateReviewDto updateReviewDto);

    void updateReviewImage(Long reviewSeq, List<String> imageUrls);

    void deleteReview(Long reviewSeq);
}
