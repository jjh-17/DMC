package com.ssafy.backend.member.service;

import com.ssafy.backend.global.exception.BaseException;
import com.ssafy.backend.global.util.TagUtil;
import com.ssafy.backend.member.model.domain.Member;
import com.ssafy.backend.member.model.mapping.MemberSeqMapping;
import com.ssafy.backend.member.model.repository.MemberRepository;
import com.ssafy.backend.review.model.domain.DangmocaReview;
import com.ssafy.backend.review.model.vo.UpdateReviewVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import static com.ssafy.backend.global.response.BaseResponseStatus.*;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    MemberRepository memberRepository;

    @Override
    public Long OAuthRegist(String memberCode, char loginType, String nickname) {
        Long memberSeq;
        memberSeq = memberRepository.save(
                Member.builder()
                        .memberCode(memberCode)
                        .type(loginType)
                        .nickname(nickname)
                        .mileage(0)
                        .isDeleted(false)
                        .build()
        ).getMemberSeq();
        return memberSeq;
    }

    @Override
    public Long isExistMember(String memberCode) {
        Member member = memberRepository.findByMemberCode(memberCode);
        if (member!=null) return member.getMemberSeq();
        else return null;
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

    @Override
    public boolean isExistNickname(String nickname) {
        Member member = memberRepository.findByNickname(nickname);
        return member != null;
    }

    @Override
    public Member getMemberInformation(Long memberSeq) {
        return memberRepository.findById(memberSeq).orElseThrow(()->new BaseException(NOT_EXIST_USER));
    }

    @Override
    public void updateNickname(Long memberSeq, String nickname) {
        Member member = memberRepository.findById(memberSeq).orElseThrow(()->new BaseException(NOT_EXIST_USER));
        member.setNickname(nickname);
        memberRepository.save(member);
    }

    @Override
    public void deleteMember(Long memberSeq) {
        Member member = memberRepository.findById(memberSeq).orElseThrow(()->new BaseException(NOT_EXIST_USER));
        if (member.isDeleted()) {
            throw new BaseException(NOT_EXIST_USER);
        }
        member.setDeleted(true);
        memberRepository.save(member);
    }
}
