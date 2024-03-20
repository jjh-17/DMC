package com.ssafy.backend.review.model.repository;

import com.ssafy.backend.review.model.domain.DangmocaReview;
import com.ssafy.backend.review.model.mapping.CafeSeqMapping;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DangmocaReviewRepository extends JpaRepository<DangmocaReview, Long> {
    List<DangmocaReview> findAllByCafeSeqOrderByCreatedDateDesc(Long cafeSeq);

    List<DangmocaReview> findAllByMemberSeqOrderByCreatedDateDesc(Long memberSeq);

    DangmocaReview findByReviewSeq(Long reviewSeq);

    List<CafeSeqMapping> findDistinctByMemberSeqInAndRating(List<Long> memberSeq, Integer rating);
}
