package com.ssafy.backend.review.model.repository;

import com.ssafy.backend.review.model.domain.PlatformReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlatformReviewRepository extends JpaRepository<PlatformReview, Long> {
    List<PlatformReview> findAllByCafeSeqOrderByCreatedDateDesc(Long cafeSeq);
}
