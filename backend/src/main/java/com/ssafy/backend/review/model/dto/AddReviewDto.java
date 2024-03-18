package com.ssafy.backend.review.model.dto;

import com.ssafy.backend.global.exception.BaseException;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

import static com.ssafy.backend.global.response.BaseResponseStatus.*;

@Getter
public class AddReviewDto {
    private Long memberSeq;
    private Long cafeSeq;
    private String content;
    private List<String> tag;
    private Integer rating;
    private String createdDate;
    private boolean isDeleted;

    public AddReviewDto(Long memberSeq, Long cafeSeq, String content, List<String> tag, Integer rating) {
        setMemberSeq(memberSeq);
        setCafeSeq(cafeSeq);
        setContent(content);
        setTag(tag);
        setRating(rating);
        setCreatedDate();
        setIsDeleted(false);
    }

    public void setMemberSeq(Long memberSeq) {
        if (memberSeq == null && memberSeq < 0){
            throw new BaseException(NEED_LOGIN);
        }
        this.memberSeq = memberSeq;
    }

    public void setCafeSeq(Long cafeSeq) {
        if (cafeSeq == null && cafeSeq < 0) {
            throw new BaseException(NOT_VALID_CAFE);
        }
        this.cafeSeq = cafeSeq;
    }

    public void setContent(String content) {
        if (content == null || "".equals(content)) {
            throw new BaseException(NOT_VALID_CONTENT);
        }
        this.content = content;
    }

    public void setTag(List<String> tag) {
        this.tag = tag;
    }

    public void setRating(Integer rating) {
        if (rating == null || (rating < 1 || rating > 5)){
            throw new BaseException(NOT_VALID_RATING);
        }
        this.rating = rating;
    }

    public void setIsDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public void setCreatedDate() {
        this.createdDate = LocalDate.now().toString();
    }

    @Override
    public String toString() {
        return "AddReviewDto{" +
                "memberSeq=" + memberSeq +
                ", cafeSeq=" + cafeSeq +
                ", content='" + content + '\'' +
                ", tag=" + tag +
                ", rating=" + rating +
                ", createdDate='" + createdDate + '\'' +
                ", isDeleted=" + isDeleted +
                '}';
    }
}

