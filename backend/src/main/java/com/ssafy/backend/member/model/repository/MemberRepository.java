package com.ssafy.backend.member.model.repository;

import com.ssafy.backend.member.model.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByMemberCode(String memberCode);
}
