package com.ssafy.backend.member.model.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@ToString
public class GetMemberInformationVo {
    private Long memberSeq;
    private String nickname;
    private String profileImageUrl;
    private String title;
    private List<String> preferenceTag;
}
