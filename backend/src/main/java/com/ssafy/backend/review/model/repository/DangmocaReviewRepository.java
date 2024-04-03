package com.ssafy.backend.review.model.repository;

import com.ssafy.backend.review.model.domain.DangmocaReview;
import com.ssafy.backend.review.model.mapping.CafeSeqMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DangmocaReviewRepository extends JpaRepository<DangmocaReview, Long> {
    List<DangmocaReview> findAllByCafeSeqOrderByCreatedDateDesc(Long cafeSeq);

    List<DangmocaReview> findAllByMemberSeqOrderByCreatedDateDesc(Long memberSeq);

    DangmocaReview findByReviewSeq(Long reviewSeq);

    List<CafeSeqMapping> findDistinctByMemberSeqInAndRating(List<Long> memberSeq, Integer rating);

    Long countByMemberSeqAndIsDeletedFalse(Long memberSeq);

    Long countByMemberSeqAndRatingAndIsDeletedFalse(Long memberSeq, Integer ratings);

    @Query(value="select count(*) from dangmoca_review d\n" +
            "join like_review l\n" +
            "on d.review_seq = l.review_seq\n" +
            "where d.review_seq=:reviewSeq", nativeQuery = true)
    Integer countByReviewSeq(Long reviewSeq);
}
