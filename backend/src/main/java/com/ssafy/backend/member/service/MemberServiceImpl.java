package com.ssafy.backend.member.service;

import com.ssafy.backend.global.exception.BaseException;
import com.ssafy.backend.member.model.domain.Member;
import com.ssafy.backend.member.model.mapping.MemberSeqMapping;
import com.ssafy.backend.member.model.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import static com.ssafy.backend.global.response.BaseResponseStatus.NOT_EXIST_USER;

@Service
public class MemberServiceImpl implements MemberService {

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
                            .nickname("당모카"+UUID.randomUUID().toString().substring(0, 8))
                            .mileage(0)
                            .isDeleted(false)
                            .build()
            ).getMemberSeq();
        } else {
            memberSeq = member.getMemberSeq();
        }
        return memberSeq;
    }

    @Override
    public List<Long> getSimilarMemberList(Long memberSeq) {
        Optional<Member> memberOptional = memberRepository.findById(memberSeq);

        if (memberOptional.isEmpty()) {
            throw new BaseException(NOT_EXIST_USER);
        }

        String preferTag = memberOptional.get().getPreferenceTag();

        List<Long> list = memberRepository.findByPreferenceTagLike(preferTag)
                .stream()
                .map(MemberSeqMapping::getMemberSeq)
                .toList();

        return list;
    }

    @Override
    public boolean isMemberNotExist(Long memberSeq) {
        return !memberRepository.existsById(memberSeq);
    }

    @Override
    public List<String> getPreferTag(Long memberSeq) {
        Optional<Member> memberOptional = memberRepository.findById(memberSeq);

        if (memberOptional.isEmpty()) {
            throw new BaseException(NOT_EXIST_USER);
        }

        String preferTag = memberOptional.get().getPreferenceTag();

        return Arrays.stream(Objects.requireNonNull(preferTag).replaceAll("[\\[\\],]", "").split("\\s+")).collect(Collectors.toList());
    }
}
