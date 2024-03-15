package com.ssafy.backend.cafe.model.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "tag_count")
public class TagCount {
    @Id
    @Column(name = "cafe_seq")
    private Long cafeSeq;

    @Column(name = "own", nullable = false)
    private boolean own;

    @Column(name = "tag1", length = 255, nullable = false)
    private String tag1;

    @Column(name = "tag2", length = 255, nullable = false)
    private String tag2;

    @Column(name = "tag3", length = 255, nullable = false)
    private String tag3;

    @Column(name = "tag4", length = 255, nullable = false)
    private String tag4;

    public Long getCafeSeq() {
        return cafeSeq;
    }

    public boolean isOwn() {
        return own;
    }

    public String getTag1() {
        return tag1;
    }

    public String getTag2() {
        return tag2;
    }

    public String getTag3() {
        return tag3;
    }

    public String getTag4() {
        return tag4;
    }
}
