package com.ssafy.backend.cafe.model.dto;

import com.ssafy.backend.global.exception.BaseException;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

import static com.ssafy.backend.global.response.BaseResponseStatus.NOT_VALID_CAFE;

@Getter
@ToString
public class AddTagCountDto {
    private Long cafeSeq;
    private boolean own;
    private List<String> tagList;

    public AddTagCountDto(Long cafeSeq, boolean own, List<String> tagList) {
        setCafeSeq(cafeSeq);
        setOwn(own);
        setTagList(tagList);
    }

    public void setCafeSeq(Long cafeSeq) {
        if (cafeSeq == null || cafeSeq < 0) {
            throw new BaseException(NOT_VALID_CAFE);
        }
        this.cafeSeq = cafeSeq;
    }

    public void setOwn(boolean own) {
        this.own = own;
    }

    public void setTagList(List<String> tagList) {
        this.tagList = tagList;
    }
}
