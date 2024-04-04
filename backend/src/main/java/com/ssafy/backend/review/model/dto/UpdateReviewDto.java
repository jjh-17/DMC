package com.ssafy.backend.review.model.dto;

import com.ssafy.backend.global.exception.BaseException;
import lombok.Getter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

import static com.ssafy.backend.global.response.BaseResponseStatus.*;
import static com.ssafy.backend.global.response.BaseResponseStatus.NOT_VALID_RATING;

@Getter
@ToString
public class UpdateReviewDto {

    private List<MultipartFile> reviewImages;
    private Long reviewSeq;
    private Long memberSeq;
    private String content;
    private List<String> tag;
    private Integer rating;
    private String updatedDate;
    private boolean isDeleted;

    public UpdateReviewDto(List<MultipartFile> reviewImages, Long reviewSeq, Long memberSeq, String content, List<String> tag, Integer rating) {
        setReviewImages(reviewImages);
        setReviewSeq(reviewSeq);
        setMemberSeq(memberSeq);
        setContent(content);
        setTag(tag);
        setRating(rating);
        setUpdatedDate();
        setIsDeleted(false);
    }

    public void setReviewImages(List<MultipartFile> reviewImages) {
        this.reviewImages = reviewImages;
    }

    public void setReviewSeq(Long reviewSeq) {
        if (reviewSeq == null && reviewSeq < 0){
            throw new BaseException(NOT_EXIST_REVIEW);
        }
        this.reviewSeq = reviewSeq;
    }

    public void setMemberSeq(Long memberSeq) {
        if (memberSeq == null && memberSeq < 0){
            throw new BaseException(NEED_LOGIN);
        }
        this.memberSeq = memberSeq;
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

    public void setUpdatedDate() {
        this.updatedDate = LocalDate.now().toString();
    }
}
