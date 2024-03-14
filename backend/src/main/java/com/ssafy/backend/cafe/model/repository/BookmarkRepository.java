package com.ssafy.backend.cafe.model.repository;

import com.ssafy.backend.cafe.model.domain.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {


}
