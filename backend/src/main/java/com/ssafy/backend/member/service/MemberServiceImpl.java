package com.ssafy.backend.member.service;

import com.ssafy.backend.global.exception.BaseException;
import com.ssafy.backend.global.util.GlobalUtil;
import com.ssafy.backend.member.model.domain.Member;
import com.ssafy.backend.member.model.domain.MileageLog;
import com.ssafy.backend.member.model.dto.AddMileageDto;
import com.ssafy.backend.member.model.mapping.MemberSeqMapping;
import com.ssafy.backend.member.model.repository.MemberRepository;
import com.ssafy.backend.member.model.repository.MileageLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import static com.ssafy.backend.global.response.BaseResponseStatus.*;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    MileageLogRepository mileageLogRepository;

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
    public Member isExistMember(String memberCode) {
        return memberRepository.findByMemberCode(memberCode);
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
        Member member = memberRepository.findById(memberSeq).orElseThrow(()->new BaseException(NOT_EXIST_USER));
        return member;
    }

    @Override
    public void updateNickname(Long memberSeq, String nickname) {
        Member member = memberRepository.findById(memberSeq).orElseThrow(()->new BaseException(NOT_EXIST_USER));
        member.setNickname(nickname);
        memberRepository.save(member);
    }

    @Override
    public void updatePreferenceTag(Long memberSeq, List<String> resultTag) {
        Member member = memberRepository.findById(memberSeq).orElseThrow(()->new BaseException(NOT_EXIST_USER));
        member.setPreferenceTag(GlobalUtil.tagsToString(resultTag));
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

    @Override
    public void addMileage(AddMileageDto addMileageDto) {
        mileageLogRepository.save(
                MileageLog.builder()
                        .memberSeq(addMileageDto.getMemberSeq())
                        .mileageChange(addMileageDto.getMileageChange())
                        .createdDate(addMileageDto.getCreatedDate())
                        .build()
        );
    }
}
