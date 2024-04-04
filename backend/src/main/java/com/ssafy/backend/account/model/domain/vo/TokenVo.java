package com.ssafy.backend.account.model.domain.vo;

import com.ssafy.backend.global.exception.BaseException;
import lombok.Getter;
import lombok.ToString;

import static com.ssafy.backend.global.response.BaseResponseStatus.JWT_ERROR;
import static com.ssafy.backend.global.response.BaseResponseStatus.NOT_EXIST_USER;

@Getter
@ToString
public class TokenVo {

    private String accessToken;
    private String refreshToken;
    private Long memberSeq;

    public TokenVo(String accessToken, String refreshToken, Long memberSeq) {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setMemberSeq(memberSeq);
    }

    public void setAccessToken(String accessToken) {
        if (accessToken == null || "".equals(accessToken)) {
            throw new BaseException(JWT_ERROR);
        }
        this.accessToken = accessToken;
    }

    public void setRefreshToken(String refreshToken) {
        if (refreshToken == null || "".equals(refreshToken)) {
            throw new BaseException(JWT_ERROR);
        }
        this.refreshToken = refreshToken;
    }

    public void setMemberSeq(Long memberSeq) {
        if(memberSeq == null || memberSeq <= 0){
            throw new BaseException(NOT_EXIST_USER);
        }
        this.memberSeq = memberSeq;
    }

}
