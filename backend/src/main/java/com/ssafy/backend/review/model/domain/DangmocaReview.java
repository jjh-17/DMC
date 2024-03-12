package com.ssafy.backend.review.model.domain;


import jakarta.annotation.Nullable;
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
    @Nullable
    private String tag;

    @Column
    private Integer rating;

    @Column
    private boolean isDeleted;

    @Column
    private String createdDate;

    @Column
    @Nullable
    private String updatedDate;

    public DangmocaReview() {

    }

    public void updateReview(String content, String tag, Integer rating, String updateDate) {
        this.content = content;
        this.tag = tag;
        this.rating = rating;
        this.updatedDate = updateDate;
    }

    public void deleteReview() {
        this.isDeleted = true;
    }

    public DangmocaReview(Long reviewSeq, Long memberSeq, Long cafeSeq, String content, String tag, Integer rating, boolean isDeleted, String createdDate, String updatedDate) {
        this.reviewSeq = reviewSeq;
        this.memberSeq = memberSeq;
        this.cafeSeq = cafeSeq;
        this.content = content;
        this.tag = tag;
        this.rating = rating;
        this.isDeleted = isDeleted;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }
}
