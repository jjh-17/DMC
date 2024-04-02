package com.ssafy.backend.account.controller;

import com.ssafy.backend.account.model.domain.vo.TokenVo;
import com.ssafy.backend.account.service.AccountFacade;
import com.ssafy.backend.account.service.AccountService;
import com.ssafy.backend.account.service.OAuthService;
import com.ssafy.backend.global.response.BaseResponse;
import com.ssafy.backend.global.util.RedisDao;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static com.ssafy.backend.global.response.BaseResponseStatus.REISSUE_ERROR;
import static com.ssafy.backend.global.response.BaseResponseStatus.SUCCESS;
import static org.apache.http.HttpStatus.SC_FORBIDDEN;

@RestController
@RequestMapping("/api/account")
public class AcoountController {

    @Autowired
    @Qualifier("kakaoOAuthServiceImpl")
    OAuthService kakaoOAuthService;

    @Autowired
    @Qualifier("naverOAuthServiceImpl")
    OAuthService naverOAuthService;

    @Autowired
    AccountService accountService;

    @Autowired
    AccountFacade accountFacade;

    @Autowired
    RedisDao redisDao;

    /*
     * 카카오 로그인
     */
    @GetMapping("kakao")
    public BaseResponse<?> kakaoLogin(@RequestParam String code, HttpServletResponse response) {
        String access_Token = kakaoOAuthService.getToken(code);
        String memberCode = kakaoOAuthService.getUser(access_Token);

        Map<String, Object> resultMap = accountFacade.OAuthLogin(memberCode, 'K');

        TokenVo tokenVo = (TokenVo) resultMap.get("tokenVo");

        response.setHeader("accessToken", tokenVo.getAccessToken());
        response.setHeader("refreshToken", tokenVo.getRefreshToken());

        return new BaseResponse<>(SUCCESS, resultMap.get("memberInformation"));
    }

    /*
     * 네이버 로그인
     */
    @GetMapping("naver")
    public BaseResponse<?> naverLogin(@RequestParam String code, HttpServletResponse response) {
        String accessToken = naverOAuthService.getToken(code);
        String memberCode = naverOAuthService.getUser(accessToken);

        Map<String, Object> resultMap = accountFacade.OAuthLogin(memberCode, 'N');

        TokenVo tokenVo = (TokenVo) resultMap.get("tokenVo");

        response.setHeader("accessToken", tokenVo.getAccessToken());
        response.setHeader("refreshToken", tokenVo.getRefreshToken());

        return new BaseResponse<>(SUCCESS, resultMap.get("memberInformation"));
    }

    @GetMapping("logout")
    public BaseResponse<?> logout(HttpServletRequest request) {
        Long memberSeq = (Long) request.getAttribute("seq");
        accountService.logout(memberSeq);
        return new BaseResponse<>(SUCCESS);
    }

    /*
     * 회원 탈퇴
     */
    @DeleteMapping("signout")
    public BaseResponse<?> deleteMember(HttpServletRequest request) {
        Long memberSeq = (Long) request.getAttribute("seq");
        accountService.deleteMember(memberSeq);
        return new BaseResponse<>(SUCCESS);
    }

    // jwt 재발급
    @GetMapping("reissue")
    public BaseResponse<?> reissue(HttpServletRequest request, HttpServletResponse response) {
        String headerToken = request.getHeader("Authorization-refresh");

        TokenVo tokenVo;
        try {
            tokenVo = accountService.reissue(headerToken);
            response.setHeader("accessToken", tokenVo.getAccessToken());
            response.setHeader("refreshToken", tokenVo.getRefreshToken());
        } catch (Exception e) {
            response.setStatus(SC_FORBIDDEN);
            return new BaseResponse<>(REISSUE_ERROR);
        }

        return new BaseResponse<>(SUCCESS);
    }
}
