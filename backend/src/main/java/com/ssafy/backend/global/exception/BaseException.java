package com.ssafy.backend.global.exception;

import com.ssafy.backend.global.response.BaseResponseStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BaseException extends RuntimeException{
    private BaseResponseStatus status;
    public BaseException(BaseResponseStatus status) {
        this.status = status;
    }

}