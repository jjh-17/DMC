package com.ssafy.backend.account.service;

public interface KakaoOAuthService {
    String getToken(String code);

    String getUser(String token);
}
