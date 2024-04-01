package com.ssafy.backend.account.service;

import com.ssafy.backend.account.model.domain.vo.TokenVo;

public interface AccountService {
    TokenVo OAuthLogin(String memberCode, char loginType);

    void deleteMember(Long memberSeq);

    TokenVo reissue(String headerToken);
}
