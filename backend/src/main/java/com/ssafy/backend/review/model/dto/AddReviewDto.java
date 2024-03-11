package com.ssafy.backend.review.model.dto;

import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

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
        this.memberSeq = memberSeq;
    }

    public void setCafeSeq(Long cafeSeq) {
        this.cafeSeq = cafeSeq;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setTag(List<String> tag) {
        this.tag = tag;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public void setIsDeleted(boolean deleted) {
        isDeleted = deleted;
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

