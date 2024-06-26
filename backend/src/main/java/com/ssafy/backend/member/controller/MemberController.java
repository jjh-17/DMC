package com.ssafy.backend.member.controller;


import com.ssafy.backend.global.exception.BaseException;
import com.ssafy.backend.global.response.BaseResponse;
import com.ssafy.backend.member.model.vo.GetMemberInformationVo;
import com.ssafy.backend.member.service.MemberFacade;
import com.ssafy.backend.member.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

import static com.ssafy.backend.global.response.BaseResponseStatus.EXIST_NICKNAME;
import static com.ssafy.backend.global.response.BaseResponseStatus.SUCCESS;

@RestController
@RequestMapping("/api/members")
public class MemberController {

    @Autowired
    MemberService memberService;

    @Autowired
    MemberFacade memberFacade;

    /*
     * 닉네임 바꿀 때 중복 확인
     */
    @PostMapping("/nickname")
    public BaseResponse<?> isExistNickname(@RequestBody Map<String, String> body) {
        String nickname = body.get("nickname");
        if (!memberService.isExistNickname(nickname)) return new BaseResponse<>(SUCCESS);
        else throw new BaseException(EXIST_NICKNAME);
    }

    /*
     * 닉네임 변경
     */
    @PatchMapping("/nickname")
    public BaseResponse<?> updateNickname(HttpServletRequest request, @RequestBody Map<String, Object> body) {
        Long memberSeq = (Long) request.getAttribute("seq");
        boolean able = (boolean) body.get("able");
        if (able) {
            memberService.updateNickname(memberSeq, (String) body.get("nickname"));
            return new BaseResponse<>(SUCCESS);
        } else {
            throw new BaseException(EXIST_NICKNAME);
        }
    }

    /*
     * 프로필 사진 변경
     */
    @PatchMapping("/profile")
    public BaseResponse<?> updateProfileImage(HttpServletRequest request, @RequestBody MultipartFile profileImage) {
        Long memberSeq = (Long) request.getAttribute("seq");
        memberFacade.updateProfileImage(memberSeq, profileImage);
        return new BaseResponse<>(SUCCESS);
    }

    /*
     * 회원 정보 조회
     */
    @GetMapping("/{memberid}")
    public BaseResponse<?> getMemberInformation(@PathVariable("memberid") Long memberSeq) {
        GetMemberInformationVo getMemberInformationVo = memberFacade.getMemberInformation(memberSeq);
        return new BaseResponse<>(getMemberInformationVo);
    }

    /*
     * 내 정보 조회
     */
    @GetMapping("/mypage")
    public BaseResponse<?> getMyPageInformation(HttpServletRequest request) {
        Long memberSeq = (Long) request.getAttribute("seq");
        GetMemberInformationVo getMemberInformationVo = memberFacade.getMemberInformation(memberSeq);
        return new BaseResponse<>(getMemberInformationVo);
    }


    /*
     * 회원 선호 태그 반영
     */
    @PostMapping("/test")
    public BaseResponse<?> updatePreferenceTag(HttpServletRequest request, @RequestBody Map<String, List<String>> body) {
        Long memberSeq = (Long) request.getAttribute("seq");
        memberService.updatePreferenceTag(memberSeq, body.get("resultTag"));
        return new BaseResponse<>(SUCCESS);
    }

    /*
     * 회원 대표 칭호 바꾸기
     */
    @PatchMapping("/achievement")
    public BaseResponse<?> updateAchievementTitle(@RequestBody Map<String, String> body, HttpServletRequest request) {
        Long memberSeq = (Long) request.getAttribute("seq");
        memberFacade.updateTitleAchievement(memberSeq, body.get("title"));
        return new BaseResponse<>(SUCCESS);
    }
}
