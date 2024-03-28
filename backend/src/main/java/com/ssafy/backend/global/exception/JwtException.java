package com.ssafy.backend.global.exception;

public class JwtException extends RuntimeException {
    public JwtException(String msg) {
        super(msg);
    }
}
