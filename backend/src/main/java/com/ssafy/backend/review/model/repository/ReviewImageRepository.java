package com.ssafy.backend.review.model.repository;

import com.ssafy.backend.review.model.domain.ReviewImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewImageRepository extends JpaRepository<ReviewImage, Long> {
    List<ReviewImage> findAllByReviewSeq(Long reviewSeq);
}
