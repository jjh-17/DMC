package com.ssafy.backend.member.service;

import java.util.List;

public interface MemberService {

    Long OAuthLogin(String memberCode, char loginType);

    List<Long> getSimilarMemberList(Long memberSeq);

    boolean isMemberNotExist(Long memberSeq);

    List<String> getPreferTag(Long memberSeq);
}
