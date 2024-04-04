package com.ssafy.backend.review.model.vo;

import com.ssafy.backend.review.model.domain.DangmocaReview;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class ViewReviewVo {
    private Long reviewSeq;
    private Long memberSeq;
    private Long cafeSeq;
    private String cafeName;
    private String nickname;
    private String profileImageUrl;
    private String content;
    private String title;
    private List<String> tag;
    private Integer rating;
    private Integer likeCount;
    private Boolean isPositive;
    private boolean isAd;
    private boolean isDeleted;
    private boolean isLiked;
    private String updatedDate;
    private String createdDate;
    private List<String> imageUrl;
    private char platform;
}
