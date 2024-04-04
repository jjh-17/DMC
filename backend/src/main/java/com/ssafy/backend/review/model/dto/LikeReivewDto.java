package com.ssafy.backend.review.model.dto;

import com.ssafy.backend.global.exception.BaseException;
import lombok.Getter;
import lombok.ToString;

import static com.ssafy.backend.global.response.BaseResponseStatus.NOT_EXIST_REVIEW;
import static com.ssafy.backend.global.response.BaseResponseStatus.NOT_EXIST_USER;

@Getter
@ToString
public class LikeReivewDto {
    private Long memberSeq;
    private Long reviewSeq;

    public LikeReivewDto(Long memberSeq, Long reviewSeq) {
        setMemberSeq(memberSeq);
        setReviewSeq(reviewSeq);
    }

    public void setMemberSeq(Long memberSeq) {
        if (memberSeq==null || memberSeq < 0) {
            throw new BaseException(NOT_EXIST_USER);
        }
        this.memberSeq = memberSeq;
    }

    public void setReviewSeq(Long reviewSeq) {
        if (memberSeq==null || memberSeq < 0) {
            throw new BaseException(NOT_EXIST_REVIEW);
        }
        this.reviewSeq = reviewSeq;
    }
}
