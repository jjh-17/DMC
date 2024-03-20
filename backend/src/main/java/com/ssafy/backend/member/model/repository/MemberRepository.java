package com.ssafy.backend.member.model.repository;

import com.ssafy.backend.member.model.domain.Member;
import com.ssafy.backend.member.model.mapping.MemberSeqMapping;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByMemberCode(String memberCode);

    List<MemberSeqMapping> findByPreferenceTagLike(String preferTag);

    Member findByNickname(String nickname);
}
