package com.ssafy.backend.member.service;

import com.ssafy.backend.member.model.domain.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

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

    private String makeRandomNickname() {
        String nickname;
        while (true) {
            nickname = "당모카" + UUID.randomUUID().toString().substring(0, 8);
            if (!memberService.isExistNickname(nickname)) break;
        }
        return nickname;
    }

    @Transactional
    public List<String> getAchievement(Long memberSeq, HashMap<String, Integer> ratingMap) {
        List<String> list = new ArrayList<>();

        list.add(memberService.getTotalCountAchievement(memberSeq, ratingMap.get("total")));
        list.add(memberService.getRatingAchievement(memberSeq, 1, ratingMap.get("1")));
        list.add(memberService.getRatingAchievement(memberSeq, 3, ratingMap.get("3")));
        list.add(memberService.getRatingAchievement(memberSeq, 5, ratingMap.get("5")));

        return list;
    }
}
