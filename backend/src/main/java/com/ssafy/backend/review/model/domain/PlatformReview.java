package com.ssafy.backend.review.model.domain;

import com.ssafy.backend.global.util.GlobalUtil;
import com.ssafy.backend.review.model.vo.ViewReviewVo;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Entity
@Builder
@Getter
@ToString
public class PlatformReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long reviewSeq;

    @Column
    private Long cafeSeq;

    @Column
    private String content;

    @Column
    private String nickname;

    @Column
    private char platform;

    @Column
    @Nullable
    private String tag;

    @Column
    private String createdDate;

    @Column
    @Nullable
    private String collectedDate;

    public PlatformReview() {

    }

    public PlatformReview(Long reviewSeq, Long cafeSeq, String content, String nickname, char platform, @Nullable String tag, String createdDate, @Nullable String collectedDate) {
        this.reviewSeq = reviewSeq;
        this.cafeSeq = cafeSeq;
        this.content = content;
        this.nickname = nickname;
        this.platform = platform;
        this.tag = tag;
        this.createdDate = createdDate;
        this.collectedDate = collectedDate;
    }

    public ViewReviewVo toVo() {
        ViewReviewVo viewReviewVo = new ViewReviewVo();
        viewReviewVo.setReviewSeq(this.reviewSeq);
        viewReviewVo.setCafeSeq(this.cafeSeq);
        viewReviewVo.setNickname(this.nickname);
        viewReviewVo.setContent(this.content);
        viewReviewVo.setPlatform(this.platform);
        viewReviewVo.setTag(GlobalUtil.tagsToList(this.tag));
        viewReviewVo.setCreatedDate(this.createdDate);
        viewReviewVo.setUpdatedDate(this.collectedDate);
        return viewReviewVo;
    }
}
