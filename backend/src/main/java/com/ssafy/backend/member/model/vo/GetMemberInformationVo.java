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
    private List<String> titleList;
    private List<String> preferenceTag;
    private Integer mileage;
    private boolean isDeleted;

    public GetMemberInformationVo(Long memberSeq, String nickname, String profileImageUrl, String title, List<String> preferenceTag, Integer mileage, boolean isDeleted) {
        setMemberSeq(memberSeq);
        setNickname(nickname);
        setProfileImageUrl(profileImageUrl);
        setTitle(title);
        setPreferenceTag(preferenceTag);
        setMileage(mileage);
        setDeleted(isDeleted);
    }
}
