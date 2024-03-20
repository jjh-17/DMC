package com.ssafy.backend.member.service;

import com.ssafy.backend.global.exception.BaseException;
import com.ssafy.backend.global.util.GlobalUtil;
import com.ssafy.backend.member.model.domain.Member;
import com.ssafy.backend.member.model.mapping.MemberSeqMapping;
import com.ssafy.backend.member.model.repository.MemberRepository;
import com.ssafy.backend.member.model.vo.GetMemberInformationVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
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
        Member member = memberService.isExistMember(memberCode);
        Long memberSeq;
        if (member == null) {  // 처음 로그인한 회원
            memberSeq = memberService.OAuthRegist(memberCode, loginType, makeRandomNickname());
        } else {
            if (member.isDeleted()) {  // 탈퇴한 회원일 경우 다시 가입
                memberSeq = memberService.OAuthRegist(memberCode, loginType, makeRandomNickname());
            } else {
                memberSeq = member.getMemberSeq();
            }
        }
        return memberSeq;
    }

    private String makeRandomNickname(){
        String nickname;
        while (true) {
            nickname = "당모카" + UUID.randomUUID().toString().substring(0, 8);
            if (!memberService.isExistNickname(nickname)) break;
        }
        return nickname;
    }
}
