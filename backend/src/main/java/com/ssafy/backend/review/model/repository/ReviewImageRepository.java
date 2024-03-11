package com.ssafy.backend.review.model.repository;

import com.ssafy.backend.review.model.domain.ReviewImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewImageRepository extends JpaRepository<ReviewImage, Long> {
}
