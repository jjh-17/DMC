package com.ssafy.backend.cafe.model.repository;

import com.ssafy.backend.cafe.model.domain.TagCount;
import com.ssafy.backend.cafe.model.domain.TagCountId;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;


public interface TagCountRepository extends JpaRepository<TagCount, TagCountId> {

}

