package com.ssafy.backend.review.model.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

@Entity
@Builder
@Getter
public class LikeReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long likeSeq;

    @Column
    private Long memberSeq;

    @Column
    private Long reviewSeq;

    public LikeReview() {}

    public LikeReview(Long likeSeq, Long memberSeq, Long reviewSeq) {
        this.likeSeq = likeSeq;
        this.memberSeq = memberSeq;
        this.reviewSeq = reviewSeq;
    }
}
