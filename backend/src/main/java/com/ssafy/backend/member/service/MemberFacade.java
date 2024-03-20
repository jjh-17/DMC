package com.ssafy.backend.member.service;

import com.ssafy.backend.global.exception.BaseException;
import com.ssafy.backend.member.model.domain.Member;
import com.ssafy.backend.member.model.mapping.MemberSeqMapping;
import com.ssafy.backend.member.model.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.ssafy.backend.global.response.BaseResponseStatus.NOT_EXIST_USER;

@Service
public class MemberFacade {

    @Autowired
    MemberService memberService;

    public Long OAuthLogin(String memberCode, char loginType) {
        Long memberSeq = memberService.isExistMember(memberCode);
        if (memberSeq == null) {  // 처음 로그인한 회원
            String nickname;
            while (true) {
                nickname = "당모카" + UUID.randomUUID().toString().substring(0, 8);
                if(!memberService.isExistNickname(nickname)) break;
            }
            memberSeq = memberService.OAuthRegist(memberCode, loginType, nickname);
        }
        return memberSeq;
    }
}
