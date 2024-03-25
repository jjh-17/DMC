package com.ssafy.backend.member.model.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;

@Entity
@Table(name = "achievement")
@Builder
public class Achievement {

    @Id
    @Column
    Long memberSeq;

    @Column
    String title;

    @Column
    String created_date;

    public Achievement(Long memberSeq, String title, String created_date) {
        this.memberSeq = memberSeq;
        this.title = title;
        this.created_date = created_date;
    }

    public Achievement() {

    }
}
