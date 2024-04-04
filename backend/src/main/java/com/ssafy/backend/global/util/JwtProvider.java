package com.ssafy.backend.global.util;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtProvider {

    private final String issuer = "dangmoca";
    @Value("${security.salt}")
    private String salt;

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
            return false;
        }
    }

    public Long getMemberSeq(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(salt)
                .parseClaimsJws(token)
                .getBody();
        return claims.get("memberSeq", Long.class);
    }

    public String getToken(String header) {
        if (header != null && header.startsWith("Bearer")) {
            return header.substring("Bearer ".length());
        }
        return null;
    }

}