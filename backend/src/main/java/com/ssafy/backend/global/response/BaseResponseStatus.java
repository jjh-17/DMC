package com.ssafy.backend.global.response;

import lombok.Getter;

@Getter
public enum BaseResponseStatus {

    /**
     * 200 : 요청 성공
     */
    SUCCESS(true, 200, "요청에 성공하였습니다."),

    /**
     * 회원 관련 에러
     */
    NOT_EXIST_USER(false, 400, "존재하지 않는 사용자입니다."),
    NEED_LOGIN(false, 400, "로그인이 필요한 서비스입니다."),
    EXIST_NICKNAME(false, 400, "이미 존재하는 닉네임입니다."),

    /**
     * 카페 관련 에러
     */
    NOT_VALID_CAFE(false, 400, "존재하지 않는 카페입니다."),
    EXIST_BOOKMARK(false, 400, "이미 북마크한 카페입니다."),
    NOT_VALID_BOOKMARK_CANCEL(false, 400, "이미 취소한 북마크입니다."),
    NO_FIVE_STAR_REVIEW(false, 400, "5점을 준 리뷰가 없습니다."),
    NO_TAG(false, 400, "나의 선호 태그가 없습니다."),
    NOT_VALID_TAG(false, 400, "카페의 태그가 존재하지 않습니다."),
    NOT_VALID_LOCATION(false, 400, "유효하지 않은 위경도입니다."),
    NOT_VALID_CAFE_NAME(false, 400, "유효하지 않은 카페 이름입니다."),
    NOT_VALID_CAFE_ADDRESS(false, 400, "유효하지 않은 카페 주소입니다."),
    NOT_VALID_CAFE_IMAGE(false, 400, "유효하지 않은 카페 이미지입니다."),
    NOT_VALID_DISTANCE(false, 400, "유효하지 않은 거리입니다."),
    NOT_VALID_MENU_NAME(false, 400, "유효하지 않은 메뉴 이름입니다."),


    /**
     * 리뷰 관련 에러
     */
    NOT_VALID_CONTENT(false, 400, "내용을 입력해주세요."),
    NOT_VALID_RATING(false, 400, "평점을 남겨주세요."),
    NOT_EXIST_REVIEW(false, 400, "존재하지 않는 리뷰입니다."),
    NO_SAME_USER(false, 400, "수정할 수 없는 리뷰입니다."),
    ALREADY_EXIST_LIKE(false, 400, "이미 좋아요 누른 리뷰입니다."),

    /**
     * JWT 에러
     */
    JWT_ERROR(false, 401, "인증 오류입니다."),
    REISSUE_ERROR(false, 403, "토큰 재발급 오류입니다."),

    /**
     * S3 에러
     */
    NOT_VALID_PHOTO(false, 400, "사진 업로드 오류입니다."),

    /**
     * 5000 : 잡지 못 한 서버 오류
     */
    OOPS(false, 500, "Oops...");


    private final boolean isSuccess;
    private final int code;
    private final String message;

    BaseResponseStatus(boolean isSuccess, int code, String message) {
        this.isSuccess = isSuccess;
        this.code = code;
        this.message = message;
    }

}
