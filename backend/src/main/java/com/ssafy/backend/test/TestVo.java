package com.ssafy.backend.test;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class TestVo {
    private String name;
    private Integer age;
    private MultipartFile profilePic;
}
