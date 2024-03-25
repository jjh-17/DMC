package com.ssafy.backend.member.service;

import com.ssafy.backend.member.model.domain.Member;
import com.ssafy.backend.member.model.dto.AddMileageDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MemberService {

    Long OAuthRegist(String memberCode, char loginType, String nickname);

    Member isExistMember(String memberCode);

    List<Long> getSimilarMemberList(Long memberSeq);

    boolean isMemberNotExist(Long memberSeq);

    List<String> getPreferTag(Long memberSeq);

    boolean isExistNickname(String nickname);

    Member getMemberInformation(Long memberSeq);

    List<String> getMemberAchievement(Long memberSeq);

    void updateNickname(Long memberSeq, String nickname);

    void deleteMemberProfileImage(Long memberSeq);

    void updateMemberProfileImage(Long memberSeq, MultipartFile profileImage);

    void updatePreferenceTag(Long memberSeq, List<String> resultTag);

    void deleteMember(Long memberSeq);

    void addMileage(AddMileageDto addMileageDto);

    String getTotalCountAchievement(Long memberSeq, int totalCount);

    String getRatingAchievement(Long memberSeq, int rating, int count);
}
