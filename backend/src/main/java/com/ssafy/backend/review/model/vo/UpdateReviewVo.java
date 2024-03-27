package com.ssafy.backend.review.model.vo;

import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class UpdateReviewVo {
    private Long cafeSeq;
    private String originTag;
}
