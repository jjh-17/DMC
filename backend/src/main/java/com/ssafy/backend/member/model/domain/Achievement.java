package com.ssafy.backend.member.model.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.ToString;

@Entity
@Table(name = "achievement")
@Builder
@ToString
public class Achievement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    Long achievementSeq;

    @Column
    Long memberSeq;

    @Column
    String title;

    @Column
    String created_date;

    public Achievement(Long achievementSeq, Long memberSeq, String title, String created_date) {
        this.achievementSeq = achievementSeq;
        this.memberSeq = memberSeq;
        this.title = title;
        this.created_date = created_date;
    }

    public Achievement() {

    }

    public String getTitle() {
        return title;
    }
}
