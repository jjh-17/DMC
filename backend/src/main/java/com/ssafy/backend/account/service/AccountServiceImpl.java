package com.ssafy.backend.account.service;

import com.ssafy.backend.account.model.domain.vo.TokenVo;
import com.ssafy.backend.global.util.JwtProvider;
import com.ssafy.backend.global.util.RedisDao;
import com.ssafy.backend.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    MemberService memberService;

    @Autowired
    JwtProvider jwtProvider;

    @Autowired
    RedisDao redisDao;

    @Value("${security.access-token-expire}")
    private long accessTokenExpire;

    @Value("${security.refresh-token-expire}")
    private long refreshTokenExpire;

    @Value("${security.salt}")
    private String salt;

    @Override
    public TokenVo OAuthLogin(String memberCode, char loginType) {
        Long memberSeq = memberService.OAuthLogin(memberCode, loginType);

        String accessToken = jwtProvider.createAccessToken(memberSeq, accessTokenExpire);
        String refreshToken = jwtProvider.createRefreshToken(memberSeq, refreshTokenExpire);

        redisDao.saveToRedis("accessToken:" + memberSeq, accessToken, Duration.ofMillis(accessTokenExpire));
        redisDao.saveToRedis("refreshToken:" + memberSeq, refreshToken, Duration.ofMillis(refreshTokenExpire));

        return new TokenVo(accessToken, refreshToken);
    }
}
