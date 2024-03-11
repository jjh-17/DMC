package com.ssafy.backend.review.model.domain;


import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Entity
@Builder
@Getter
@ToString
public class DangmocaReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long reviewSeq;

    @Column
    private Long memberSeq;

    @Column
    private Long cafeSeq;

    @Column
    private String content;

    @Column
    private String tag;

    @Column
    private String createdDate;

    @Column
    private Integer rating;

    @Column
    private boolean isDeleted;

    public DangmocaReview() {

    }

    public DangmocaReview(Long reviewSeq, Long memberSeq, Long cafeSeq, String content, String tag, String createdDate, Integer rating, boolean isDeleted) {
        this.reviewSeq = reviewSeq;
        this.memberSeq = memberSeq;
        this.cafeSeq = cafeSeq;
        this.content = content;
        this.tag = tag;
        this.createdDate = createdDate;
        this.rating = rating;
        this.isDeleted = isDeleted;
    }

}
