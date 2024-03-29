package com.ssafy.backend.member.service;

import com.ssafy.backend.global.exception.BaseException;
import com.ssafy.backend.global.util.GlobalUtil;
import com.ssafy.backend.global.util.S3UploadUtil;
import com.ssafy.backend.member.model.domain.Achievement;
import com.ssafy.backend.member.model.domain.Member;
import com.ssafy.backend.member.model.domain.MileageLog;
import com.ssafy.backend.member.model.dto.AddMileageDto;
import com.ssafy.backend.member.model.mapping.MemberSeqMapping;
import com.ssafy.backend.member.model.repository.AchievementRepository;
import com.ssafy.backend.member.model.repository.MemberRepository;
import com.ssafy.backend.member.model.repository.MileageLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import static com.ssafy.backend.global.response.BaseResponseStatus.NOT_EXIST_USER;
import static com.ssafy.backend.global.response.BaseResponseStatus.OOPS;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    MileageLogRepository mileageLogRepository;

    @Autowired
    AchievementRepository achievementRepository;

    @Autowired
    S3UploadUtil s3UploadUtil;

    Map<Integer, String> totalAchievements;
    Map<Integer, String> ratingAchievement;
    Map<Integer, String> countAchievement;

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
        Member member = memberRepository.findById(memberSeq).orElseThrow(() -> new BaseException(NOT_EXIST_USER));

        return member;
    }

    @Override
    public List<String> getMemberAchievement(Long memberSeq) {
        List<Achievement> archievementList = achievementRepository.findByMemberSeq(memberSeq);

        List<String> list = new ArrayList<>();

        for (Achievement achievement : archievementList) {
            list.add(achievement.getTitle());
        }

        return list;
    }

    @Override
    public void updateNickname(Long memberSeq, String nickname) {
        Member member = memberRepository.findById(memberSeq).orElseThrow(() -> new BaseException(NOT_EXIST_USER));
        member.setNickname(nickname);
        memberRepository.save(member);
    }

    @Override
    public void deleteMemberProfileImage(Long memberSeq) {
        Member member = memberRepository.findById(memberSeq).orElseThrow(() -> new BaseException(NOT_EXIST_USER));
        if (member.getImageUrl() != null) {
            s3UploadUtil.deleteImg(member.getImageUrl());
            member.setImageUrl(null);
        }
    }

    @Override
    public void updateMemberProfileImage(Long memberSeq, MultipartFile profileImage) {
        Member member = memberRepository.findById(memberSeq).orElseThrow(() -> new BaseException(NOT_EXIST_USER));
        try {
            member.setImageUrl(s3UploadUtil.uploadProfileImg(profileImage, memberSeq));
            memberRepository.save(member);
        } catch (IOException e) {
            throw new BaseException(OOPS);
        }
    }

    @Override
    public void updatePreferenceTag(Long memberSeq, List<String> resultTag) {
        Member member = memberRepository.findById(memberSeq).orElseThrow(() -> new BaseException(NOT_EXIST_USER));
        member.setPreferenceTag(GlobalUtil.tagsToString(resultTag));
        memberRepository.save(member);
    }

    @Override
    public void deleteMember(Long memberSeq) {
        Member member = memberRepository.findById(memberSeq).orElseThrow(() -> new BaseException(NOT_EXIST_USER));
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

    @Override
    public String getTotalCountAchievement(Long memberSeq, int totalCount) {
        if (isMemberNotExist(memberSeq)) {
            throw new BaseException(NOT_EXIST_USER);
        }

        // 작성 리뷰의 전체 개수로 칭호 주기
        for (Integer key : getTotalAchievement().keySet()) {
            if (key == totalCount) {
                achievementRepository.save(Achievement.builder()
                        .title(getTotalAchievement().get(key))
                        .memberSeq(memberSeq)
                        .created_date(String.valueOf(LocalDate.now()))
                        .build());
                return getTotalAchievement().get(key);
            }
        }

        return null;
    }

    @Override
    public String getRatingAchievement(Long memberSeq, int rating, int count) {
        if (isMemberNotExist(memberSeq)) {
            throw new BaseException(NOT_EXIST_USER);
        }

        HashSet<String> set = new HashSet<>();

        for (Achievement achievement : achievementRepository.findByMemberSeq(memberSeq)) {
            set.add(achievement.getTitle());
        }

        if (getRatingAchievement().containsKey(rating) && getCountAchievement().containsKey(count)) {
            StringBuilder sb = new StringBuilder();
            String title = sb.append(getRatingAchievement().get(rating)).append(getCountAchievement().get(count)).toString();

            if (set.contains(title)) {
                return null;
            }

            achievementRepository.save(Achievement.builder()
                    .title(title)
                    .memberSeq(memberSeq)
                    .created_date(String.valueOf(LocalDate.now()))
                    .build());

            return title;
        }

        return null;
    }

    @Override
    public void addAdCount(Long memberSeq) {
        Optional<Member> memberOptional = memberRepository.findById(memberSeq);

        if (memberOptional.isEmpty()) {
            throw new BaseException(NOT_EXIST_USER);
        }

        Member member = memberOptional.get();

        member.addAdCount();

        memberRepository.save(member);
    }

    @Override
    public void updateAchievement(Long memberSeq, int totalReviewCount, boolean isBalanced) {
        Optional<Member> memberOptional = memberRepository.findById(memberSeq);

        if (memberOptional.isEmpty()) {
            throw new BaseException(NOT_EXIST_USER);
        }

        Long adCount = memberOptional.get().getAdCount();

        Achievement achievement = achievementRepository.findByMemberSeqAndTitle(memberSeq, "안심리뷰어");

        if (adCount < 10 && totalReviewCount >= 50 && isBalanced) {
            if(achievement == null){
                achievementRepository.save(Achievement.builder()
                        .title("안심리뷰어")
                        .memberSeq(memberSeq)
                        .created_date(String.valueOf(LocalDate.now()))
                        .build());
            }
        }else {
            if(achievement != null){
                achievementRepository.delete(achievement);
            }
        }

    }

    private Map<Integer, String> getRatingAchievement() {
        if (ratingAchievement == null) {
            ratingAchievement = new HashMap<>();
            ratingAchievement.put(1, "깐깐한 ");
            ratingAchievement.put(3, "무덤덤한 ");
            ratingAchievement.put(5, "행복한 ");
        }
        return ratingAchievement;
    }

    private Map<Integer, String> getCountAchievement() {
        if (countAchievement == null) {
            countAchievement = new HashMap<>();
            countAchievement.put(10, "커피콩");
            countAchievement.put(20, "커피열매");
            countAchievement.put(30, "커피원두");
        }
        return countAchievement;
    }

    private Map<Integer, String> getTotalAchievement() {
        if (totalAchievements == null) {
            totalAchievements = new HashMap<>();
            totalAchievements.put(1, "리뷰의 첫걸음");
            totalAchievements.put(10, "리뷰의 시작");
            totalAchievements.put(50, "리뷰의 행복");
            totalAchievements.put(100, "인간 리뷰");
            totalAchievements.put(1000, "리뷰의 신");
        }
        return totalAchievements;
    }

}
