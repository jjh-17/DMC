package com.ssafy.backend.review.service;

import com.ssafy.backend.review.model.dto.AddReviewDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ReviewFacade {

    @Autowired
    ReviewService reviewService;

    @Transactional
    public void addReview(AddReviewDto addeReviewDto, List<String> images) {
        Long reviewSeq = reviewService.addReview(addeReviewDto);
        reviewService.addReviewImage(reviewSeq, images);
    }
}
