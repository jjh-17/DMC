package com.ssafy.backend.global.util;

import com.ssafy.backend.global.exception.BaseException;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

import static com.ssafy.backend.global.response.BaseResponseStatus.JWT_ERROR;

@Component
public class JwtProvider {

    @Value("${security.salt}")
    private String salt;

    private final String issuer = "dangmoca";

    public String createAccessToken(Long memberSeq, Long tokenLive) {
        Date now = new Date();

        Claims claims = Jwts.claims();
        claims.put("memberSeq", memberSeq);

        String token = Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setClaims(claims)
                .setIssuedAt(now)
                .setIssuer(issuer)
                .setExpiration(new Date(now.getTime() + tokenLive))
                .signWith(SignatureAlgorithm.HS256, salt)
                .compact();

        return token;
    }

    public String createRefreshToken(Long memberSeq, Long tokenLive) {
        Date now = new Date();

        Claims claims = Jwts.claims();
        claims.put("memberSeq", memberSeq);

        String token = Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setClaims(claims)
                .setIssuedAt(now)
                .setIssuer(issuer)
                .setExpiration(new Date(now.getTime() + tokenLive))
                .signWith(SignatureAlgorithm.HS256, salt)
                .compact();

        return token;
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(salt)
                    .parseClaimsJws(token);
            return !(claims.getBody().getExpiration().before(new Date()) && issuer.equals(claims.getBody().getIssuer()));
        } catch (Exception e) {
            throw new BaseException(JWT_ERROR);
        }
    }

    public Long getCode(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(salt)
                .parseClaimsJws(token)
                .getBody();
        return claims.get("memberSeq", Long.class);
    }

}