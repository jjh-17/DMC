package com.ssafy.backend.member.service;

import java.util.List;

public interface MemberService {

    Long kakaoLogin(String memberCode);

    List<Long> getSimilarMemberList(Long memberSeq);

    boolean isMemberNotExist(Long memberSeq);

    List<String> getPreferTag(Long memberSeq);
}
