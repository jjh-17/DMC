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
    private String nickname;
    private String content;
    private String tag;
    private Integer rating;
    private boolean isDeleted;
    private boolean isLiked;
    private String updatedDate;
    private List<String> imageUrl;
}
