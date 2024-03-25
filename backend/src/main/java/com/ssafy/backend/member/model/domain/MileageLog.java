package com.ssafy.backend.member.model.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MileageLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    Long mileageSeq;

    @Column
    Long memberSeq;

    @Column
    Integer mileageChange;

    @Column
    String createdDate;
}
