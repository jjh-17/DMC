package com.ssafy.backend.member.service;

import com.ssafy.backend.member.model.domain.Member;
import com.ssafy.backend.member.model.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class MemberServiceImpl implements MemberService{

    @Autowired
    MemberRepository memberRepository;

    @Override
    public Long kakaoLogin(String memberCode) {
        Long memberSeq;
        Member member = memberRepository.findByMemberCode(memberCode);
        if (member == null) {
            memberSeq = memberRepository.save(
                    Member.builder()
                            .memberCode(memberCode)
                            .type('K')
                            .nickname(UUID.randomUUID().toString())
                            .mileage(0)
                            .isDeleted(false)
                            .build()
            ).getMemberSeq();
        } else {
            memberSeq = member.getMemberSeq();
        }
        return memberSeq;
    }
}
