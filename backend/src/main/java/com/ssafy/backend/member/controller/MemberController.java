package com.ssafy.backend.member.controller;


import com.ssafy.backend.global.exception.BaseException;
import com.ssafy.backend.global.response.BaseResponse;
import com.ssafy.backend.member.model.vo.GetMemberInformationVo;
import com.ssafy.backend.member.service.MemberFacade;
import com.ssafy.backend.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    @PatchMapping("/{memberid}")
    public BaseResponse<?> updateNickname(@PathVariable("memberid") Long memberSeq, @RequestBody Map<String, Object> body){
        boolean able = (boolean) body.get("able");
        if (able) {
            memberService.updateNickname(memberSeq, (String) body.get("nickname"));
            return new BaseResponse<>(SUCCESS);
        } else {
            throw new BaseException(EXIST_NICKNAME);
        }
    }

    /*
     * 회원 정보 조회
     */
    @GetMapping("/{memberid}")
    public BaseResponse<?> getMemberInformation(@PathVariable("memberid") Long memberSeq) {
        GetMemberInformationVo getMemberInformationVo = memberService.getMemberInformation(memberSeq).toInformationVo();
        return new BaseResponse<>(getMemberInformationVo);
    }
}
