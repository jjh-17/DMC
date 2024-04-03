package com.ssafy.backend.account.service;

import com.ssafy.backend.account.model.domain.vo.TokenVo;
import com.ssafy.backend.global.exception.BaseException;
import com.ssafy.backend.global.exception.JwtException;
import com.ssafy.backend.global.util.JwtProvider;
// import com.ssafy.backend.global.util.RedisDao;
import com.ssafy.backend.member.service.MemberFacade;
import com.ssafy.backend.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Duration;

import static com.ssafy.backend.global.response.BaseResponseStatus.REISSUE_ERROR;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    MemberFacade memberFacade;

    @Autowired
    MemberService memberService;

    @Autowired
    JwtProvider jwtProvider;

    // @Autowired
    // RedisDao redisDao;

    @Value("${security.access-token-expire}")
    private long accessTokenExpire;

    @Value("${security.refresh-token-expire}")
    private long refreshTokenExpire;


    @Override
    public TokenVo OAuthLogin(String memberCode, char loginType) {
        Long memberSeq = memberFacade.OAuthLogin(memberCode, loginType);

        String accessToken = jwtProvider.createAccessToken(memberSeq, accessTokenExpire);
        String refreshToken = jwtProvider.createRefreshToken(memberSeq, refreshTokenExpire);

        // redisDao.saveToRedis("accessToken:" + memberSeq, accessToken, Duration.ofMillis(accessTokenExpire));
        // redisDao.saveToRedis("refreshToken:" + memberSeq, refreshToken, Duration.ofMillis(refreshTokenExpire));

        return new TokenVo(accessToken, refreshToken, memberSeq);
    }

    @Override
    public void logout(Long memberSeq) {
        redisDao.deleteFromRedis("accessToken:" + memberSeq);
        redisDao.deleteFromRedis("refreshToken:" + memberSeq);
    }

    @Override
    public void deleteMember(Long memberSeq) {
        memberService.deleteMember(memberSeq);
    }

    @Override
    public TokenVo reissue(String headerToken) {
        String refreshToken = jwtProvider.getToken(headerToken);

        Long memberSeq;

        if (refreshToken != null && jwtProvider.validateToken(refreshToken)) {
            memberSeq = jwtProvider.getMemberSeq(refreshToken);

            String token = (String) redisDao.readFromRedis("refreshToken:" + memberSeq);

            if (token == null) {
                throw new JwtException("재발행 오류입니다.");
            }
        } else {
            throw new JwtException("재발행 오류입니다.");
        }

        String newAccessToken = jwtProvider.createAccessToken(memberSeq, accessTokenExpire);
        String newRefreshToken = jwtProvider.createRefreshToken(memberSeq, refreshTokenExpire);

        redisDao.saveToRedis("accessToken:" + memberSeq, newAccessToken, Duration.ofMillis(accessTokenExpire));
        redisDao.saveToRedis("refreshToken:" + memberSeq, newRefreshToken, Duration.ofMillis(refreshTokenExpire));

        return new TokenVo(newAccessToken, newRefreshToken, memberSeq);
    }

}
