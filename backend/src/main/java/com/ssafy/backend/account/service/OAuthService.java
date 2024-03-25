package com.ssafy.backend.account.service;

public interface OAuthService {
    String getToken(String code);

    String getUser(String token);
}
