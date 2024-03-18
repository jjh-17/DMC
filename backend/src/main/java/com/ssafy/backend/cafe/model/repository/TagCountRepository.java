package com.ssafy.backend.cafe.model.repository;

import com.ssafy.backend.cafe.model.domain.TagCount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagCountRepository extends JpaRepository<TagCount, Long> {
    TagCount findByCafeSeqAndOwn(Long cafeSeq, Boolean own);

}
