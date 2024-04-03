package com.ssafy.backend.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:8080", "http://localhost:5173", "http://j10a607.p.ssafy.io:8082", "http://j10a607.p.ssafy.io")
                .allowedMethods("GET", "POST", "OPTIONS", "DELETE", "PATCH")
                .allowCredentials(true) // 이 줄을 추가
                .exposedHeaders("AccessToken", "RefreshToken", "accessToken", "refreshToken");
    }
}
