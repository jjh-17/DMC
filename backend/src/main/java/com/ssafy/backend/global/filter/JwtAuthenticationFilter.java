package com.ssafy.backend.global.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.global.util.JwtProvider;
import com.ssafy.backend.global.util.RedisDao;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    JwtProvider jwtProvider;
    RedisDao redisDao;

    public JwtAuthenticationFilter(JwtProvider jwtProvider, RedisDao redisDao) {
        this.jwtProvider = jwtProvider;
        this.redisDao = redisDao;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String[] excludePath = {"/api/account/kakao", "/api/account/naver", "/api/account/reissue", "/api/cafes"};
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

        String atk = jwtProvider.getToken(request.getHeader("Authorization"));

        try {
            if (atk != null && jwtProvider.validateToken(atk)) {
                Long seq = jwtProvider.getMemberSeq(atk);
                request.setAttribute("seq", seq);

                String token = (String) redisDao.readFromRedis("accessToken:" + seq);

                if (token == null) {
                    throw new JwtException("유효하지 않은 토큰입니다.");
                }
            } else {
                throw new JwtException("유효하지 않은 토큰입니다.");
            }

            filterChain.doFilter(request, response);

        } catch (Exception e) {
            ObjectMapper mapper = new ObjectMapper();

            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setCharacterEncoding("utf-8");
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);

            Map<String, Object> resultMap = new HashMap<>();
            resultMap.put("message", e.getMessage());
            resultMap.put("code", 401);

            mapper.writeValue(response.getWriter(), resultMap);
        }

    }

}
