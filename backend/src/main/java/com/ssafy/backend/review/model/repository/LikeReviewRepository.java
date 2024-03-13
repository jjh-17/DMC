package com.ssafy.backend.review.model.repository;

import com.ssafy.backend.review.model.domain.LikeReview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeReviewRepository extends JpaRepository<LikeReview, Long> {
}
