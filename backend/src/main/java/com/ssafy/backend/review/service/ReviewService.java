package com.ssafy.backend.review.service;

import com.ssafy.backend.review.model.dto.AddReviewDto;

import java.util.List;

public interface ReviewService {
    Long addReview(AddReviewDto addReviewDto);

    void addReviewImage(Long reviewSeq, List<String> images);
}
