package com.ssafy.backend.review.model.domain;

import jakarta.persistence.*;
import lombok.Builder;

@Entity
@Builder
public class ReviewImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long imageSeq;

    @Column
    private Long reviewSeq;

    @Column
    private String imageUrl;

    public ReviewImage() {

    }

    public ReviewImage(Long imageSeq, Long reviewSeq, String imageUrl) {
        this.imageSeq = imageSeq;
        this.reviewSeq = reviewSeq;
        this.imageUrl = imageUrl;
    }
}
