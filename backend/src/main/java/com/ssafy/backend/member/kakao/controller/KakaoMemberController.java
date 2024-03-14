package com.ssafy.backend.member.kakao.controller;

import com.ssafy.backend.global.response.BaseResponse;
import com.ssafy.backend.member.kakao.service.KakaoOAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static com.ssafy.backend.global.response.BaseResponseStatus.SUCCESS;

@RestController
public class KakaoMemberController {

    @Autowired
    KakaoOAuthService kakaoOAuthService;

    /*
     * 카카오 로그인
     */
    @GetMapping("kakao")
    public BaseResponse<?> kakaoLogin(@RequestParam String code) {
        String access_Token = kakaoOAuthService.getToken(code);
        String kakaoEmail = kakaoOAuthService.getUser(access_Token);
        System.out.println(kakaoEmail);
        return new BaseResponse<>(SUCCESS);
    }
}
