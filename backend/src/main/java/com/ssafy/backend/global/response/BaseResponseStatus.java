package com.ssafy.backend.global.response;

import lombok.Getter;

@Getter
public enum BaseResponseStatus {

    /**
     * 1000 : 요청 성공
     */
    SUCCESS(true, 1000, "요청에 성공하였습니다."),

    /**
     * 2000 : 회원 관련 에러
     */

    NOT_EXIST_USER(false, 2009, "존재하지 않는 사용자입니다."),
    NEED_LOGIN(false, 2010, "로그인이 필요한 서비스입니다."),

    /**
     * 3000 : 카페 관련 에러
     */

    NOT_VALID_CAFE(false, 3000, "존재하지 않는 카페입니다."),

    /**
     * 4000 : 리뷰 관련 에러
     */

    NOT_VALID_CONTENT(false, 4000, "내용을 입력해주세요."),
    NOT_VALID_RATING(false, 4000, "평점을 남겨주세요."),

    /**
     * 5000 : 잡지 못 한 서버 오류
     */
    OOPS(false, 5000, "Oops...");


    private final boolean isSuccess;
    private final int code;
    private final String message;

    BaseResponseStatus(boolean isSuccess, int code, String message) {
        this.isSuccess = isSuccess;
        this.code = code;
        this.message = message;
    }

}
