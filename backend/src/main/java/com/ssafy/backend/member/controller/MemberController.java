package com.ssafy.backend.member.controller;

import com.ssafy.backend.global.response.BaseResponse;
import com.ssafy.backend.member.service.KakaoOAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static com.ssafy.backend.global.response.BaseResponseStatus.SUCCESS;

@RestController
@RequestMapping("account")
public class MemberController {

    @Autowired
    KakaoOAuthService kakaoOAuthService;

    /*
     * 카카오 로그인
     */
    @GetMapping("kakao")
    public BaseResponse<?> kakaoLogin(@RequestParam String code) {
        String access_Token = kakaoOAuthService.getToken(code);
        String kakaoMemberCode = kakaoOAuthService.getUser(access_Token);
        System.out.println(kakaoMemberCode);
        return new BaseResponse<>(SUCCESS);
    }
}
