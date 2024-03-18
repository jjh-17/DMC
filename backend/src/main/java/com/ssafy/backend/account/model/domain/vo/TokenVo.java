package com.ssafy.backend.account.model.domain.vo;

import com.ssafy.backend.global.exception.BaseException;
import lombok.Getter;
import lombok.ToString;

import static com.ssafy.backend.global.response.BaseResponseStatus.JWT_ERROR;

@Getter
@ToString
public class TokenVo {

    private String accessToken;
    private String refreshToken;

    public TokenVo(String accessToken, String refreshToken) {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
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
}
