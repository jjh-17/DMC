package com.ssafy.backend.cafe.model.repository;

import com.ssafy.backend.cafe.model.domain.Bookmark;
import com.ssafy.backend.cafe.model.mapping.CafeSeqMapping;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    Optional<Bookmark> findByCafeSeqAndMemberSeq(Long cafeSeq, Long memberSeq);

    boolean existsByCafeSeqAndMemberSeq(Long cafeSeq, Long memberSeq);

    Page<CafeSeqMapping> findAllByMemberSeq(Long memberSeq, Pageable pageable);

}
