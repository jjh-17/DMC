package com.ssafy.backend.account.controller;

import com.ssafy.backend.account.model.domain.vo.TokenVo;
import com.ssafy.backend.account.service.AccountService;
import com.ssafy.backend.account.service.OAuthService;
import com.ssafy.backend.global.response.BaseResponse;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static com.ssafy.backend.global.response.BaseResponseStatus.SUCCESS;

@RestController
@RequestMapping("account")
public class AcoountController {

    @Autowired
    @Qualifier("kakaoOAuthServiceImpl")
    OAuthService kakaoOAuthService;

    @Autowired
    @Qualifier("naverOAuthServiceImpl")
    OAuthService naverOAuthService;


    @Autowired
    AccountService accountService;

    /*
     * 카카오 로그인
     */
    @GetMapping("kakao")
    public BaseResponse<?> kakaoLogin(@RequestParam String code, HttpServletResponse response) {
        String access_Token = kakaoOAuthService.getToken(code);
        String memberCode = kakaoOAuthService.getUser(access_Token);

        TokenVo tokenVo = accountService.OAuthLogin(memberCode, 'K');

        response.setHeader("accessToken", tokenVo.getAccessToken());
        response.setHeader("refreshToken", tokenVo.getRefreshToken());

        return new BaseResponse<>(SUCCESS);
    }

    /*
     * 네이버 로그인
     */
    @GetMapping("naver")
    public BaseResponse<?> naverLogin(@RequestParam String code, HttpServletResponse response) {
        String accessToken = naverOAuthService.getToken(code);
        String memberCode = naverOAuthService.getUser(accessToken);

        TokenVo tokenVo = accountService.OAuthLogin(memberCode, 'N');

        response.setHeader("accessToken", tokenVo.getAccessToken());
        response.setHeader("refreshToken", tokenVo.getRefreshToken());

        return new BaseResponse<>(SUCCESS);
    }
}
