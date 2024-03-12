package com.ssafy.backend.review.model.repository;

import com.ssafy.backend.review.model.domain.DangmocaReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DangmocaReviewRepository extends JpaRepository<DangmocaReview, Long> {
    List<DangmocaReview> findAllByCafeSeq(Long cafeSeq);
}
