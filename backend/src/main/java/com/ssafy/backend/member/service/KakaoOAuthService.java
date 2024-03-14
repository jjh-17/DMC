package com.ssafy.backend.member.service;

public interface KakaoOAuthService {
    String getToken(String code);

    String getUser(String token);
}
