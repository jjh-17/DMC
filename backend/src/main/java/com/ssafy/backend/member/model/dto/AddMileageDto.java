package com.ssafy.backend.member.model.dto;

import com.ssafy.backend.global.exception.BaseException;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;

import static com.ssafy.backend.global.response.BaseResponseStatus.NOT_EXIST_USER;
import static com.ssafy.backend.global.response.BaseResponseStatus.OOPS;

@Getter
@ToString
public class AddMileageDto {
    Long memberSeq;
    Integer mileageChange;
    String createdDate;

    public AddMileageDto(Long memberSeq, Integer mileageChange) {
        setMemberSeq(memberSeq);
        setMileageChange(mileageChange);
        setCreatedDate();
    }

    public void setMemberSeq(Long memberSeq) {
        if (memberSeq == null || 0 > memberSeq) {
            throw new BaseException(NOT_EXIST_USER);
        }
        this.memberSeq = memberSeq;
    }

    public void setMileageChange(Integer mileageChange) {
        if (mileageChange == null || 0 > mileageChange) {
            throw new BaseException(OOPS);
        }
        this.mileageChange = mileageChange;
    }

    public void setCreatedDate() {
        this.createdDate = LocalDate.now().toString();
    }
}
