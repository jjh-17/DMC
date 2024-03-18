package com.ssafy.backend.cafe.model.domain;

import jakarta.persistence.*;
import lombok.Builder;

@Entity
@Table(name = "bookmark")
@Builder
public class Bookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bookmark_seq")
    private Long bookmarkSeq;

    @Column(name = "member_seq", nullable = false)
    private Long memberSeq;

    @Column(name = "cafe_seq", nullable = false)
    private Long cafeSeq;

    public Bookmark() {

    }

    public Bookmark(Long bookmarkSeq, Long memberSeq, Long cafeSeq) {
        this.bookmarkSeq = bookmarkSeq;
        this.memberSeq = memberSeq;
        this.cafeSeq = cafeSeq;
    }
}
