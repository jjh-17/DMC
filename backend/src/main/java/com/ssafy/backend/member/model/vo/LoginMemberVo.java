package com.ssafy.backend.member.model.vo;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class LoginMemberVo {
    String nickname;
    String profileImageUrl;
}
