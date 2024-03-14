package com.ssafy.backend.cafe.model.repository;

import com.ssafy.backend.cafe.model.domain.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    Optional<Bookmark> findByCafeSeqAndMemberSeq(Long cafeSeq, Long memberSeq);

}
