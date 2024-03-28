package com.ssafy.backend.global.filter;

import com.ssafy.backend.global.exception.BaseException;
import com.ssafy.backend.global.util.JwtProvider;
import com.ssafy.backend.global.util.RedisDao;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;

import static com.ssafy.backend.global.response.BaseResponseStatus.JWT_ERROR;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    JwtProvider jwtProvider;
    RedisDao redisDao;

    public JwtAuthenticationFilter(JwtProvider jwtProvider, RedisDao redisDao) {
        this.jwtProvider = jwtProvider;
        this.redisDao = redisDao;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String[] excludePath = {"/api/account/kakao", "/api/account/naver", "/api/member/reissue", "/api/cafes"};
        String path = request.getRequestURI();
        return Arrays.asList(excludePath).contains(path);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");  //이렇게 해서 모든 요청에 대해서 허용할 수도 있습니다.
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "*");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept, Authorization");

        // OPTIONS로 api 요청 시 필터 통과
        if (request.getMethod().equals("OPTIONS")) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        String atk = getToken(request.getHeader("Authorization"));

//        try {
            if (atk != null && jwtProvider.validateToken(atk)) {
                Long seq = jwtProvider.getMemberSeq(atk);
                request.setAttribute("seq", seq);

                String token = (String) redisDao.readFromRedis("accessToken:" + seq);

                if (token == null) {
                    throw new BaseException(JWT_ERROR);
                }
            } else {
                throw new BaseException(JWT_ERROR);
            }
//        } catch (Exception e) {
//            throw new BaseException(JWT_ERROR);
//        }

        filterChain.doFilter(request, response);

    }

    private String getToken(String header) {
        if (header != null && header.startsWith("Bearer")) {
            return header.substring("Bearer ".length());
        }
        return null;
    }
}
