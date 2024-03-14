package com.ssafy.backend.member.kakao.service;

public interface KakaoOAuthService {
    String getToken(String code);

    String getUser(String token);
}
