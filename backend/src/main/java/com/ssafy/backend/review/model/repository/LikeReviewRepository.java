package com.ssafy.backend.review.model.repository;

import com.ssafy.backend.review.model.domain.LikeReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeReviewRepository extends JpaRepository<LikeReview, Long> {
    List<LikeReview> findAllByMemberSeq(Long memberSeq);

    void deleteByReviewSeqAndMemberSeq(Long reviewSeq, Long memberSeq);
}
