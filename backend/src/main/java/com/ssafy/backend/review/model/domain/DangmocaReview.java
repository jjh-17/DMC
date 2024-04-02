package com.ssafy.backend.review.model.domain;


import com.ssafy.backend.global.util.GlobalUtil;
import com.ssafy.backend.review.model.vo.ViewReviewVo;
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
    private Boolean isPositive;

    @Column
    private boolean isDeleted;

    @Column
    private String createdDate;

    @Column
    @Nullable
    private String updatedDate;

    public DangmocaReview() {}

    public void updateReview(String content, String tag, Integer rating, String updateDate) {
        this.content = content;
        this.tag = tag;
        this.rating = rating;
        this.updatedDate = updateDate;
    }

    public void deleteReview() {
        this.isDeleted = true;
    }

    public DangmocaReview(Long reviewSeq, Long memberSeq, Long cafeSeq, String content, String tag, Integer rating, Boolean isPositive, boolean isDeleted, String createdDate, String updatedDate) {
        this.reviewSeq = reviewSeq;
        this.memberSeq = memberSeq;
        this.cafeSeq = cafeSeq;
        this.content = content;
        this.tag = tag;
        this.rating = rating;
        this.isPositive = isPositive;
        this.isDeleted = isDeleted;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }

    public ViewReviewVo toVo() {
        ViewReviewVo viewReviewVo = new ViewReviewVo();
        viewReviewVo.setReviewSeq(this.reviewSeq);
        viewReviewVo.setMemberSeq(this.memberSeq);
        viewReviewVo.setCafeSeq(this.cafeSeq);
        viewReviewVo.setContent(this.content);
        viewReviewVo.setPlatform('D');
        viewReviewVo.setTag(GlobalUtil.tagsToList(this.tag));
        viewReviewVo.setRating(this.rating);
        viewReviewVo.setIsPositive(this.isPositive);
        viewReviewVo.setDeleted(this.isDeleted);
        viewReviewVo.setCreatedDate(this.createdDate);
        viewReviewVo.setUpdatedDate(this.updatedDate);
        return viewReviewVo;
    }
}
