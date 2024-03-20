package com.ssafy.backend.member.service;

import com.ssafy.backend.member.model.domain.Member;
import com.ssafy.backend.member.model.vo.GetMemberInformationVo;

import java.util.List;

public interface MemberService {

    Long OAuthRegist(String memberCode, char loginType, String nickname);
    Long isExistMember(String memberCode);

    List<Long> getSimilarMemberList(Long memberSeq);

    boolean isMemberNotExist(Long memberSeq);

    List<String> getPreferTag(Long memberSeq);

    boolean isExistNickname(String nickname);

    Member getMemberInformation(Long memberSeq);

    void updateNickname(Long memberSeq, String nickname);

    void deleteMember(Long memberSeq);
}
