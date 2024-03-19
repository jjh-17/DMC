package com.ssafy.backend.cafe.model.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;


@Entity
@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class TagCount {

    @EmbeddedId
    private TagCountId id;

    @Column(name = "cagong", columnDefinition = "bigint default 0")
    private Long cagong;

    @Column(name = "cute", columnDefinition = "bigint default 0")
    private Long cute;

    @Column(name = "date", columnDefinition = "bigint default 0")
    private Long date;

    @Column(name = "large", columnDefinition = "bigint default 0")
    private Long large;

    @Column(name = "petit", columnDefinition = "bigint default 0")
    private Long petit;

    @Column(name = "calm", columnDefinition = "bigint default 0")
    private Long calm;

    @Column(name = "sns_pick", columnDefinition = "bigint default 0")
    private Long snsPick;

    @Column(name = "cozy", columnDefinition = "bigint default 0")
    private Long cozy;

    @Column(name = "coffee", columnDefinition = "bigint default 0")
    private Long coffee;

    @Column(name = "dessert", columnDefinition = "bigint default 0")
    private Long dessert;

    @Column(name = "view", columnDefinition = "bigint default 0")
    private Long view;

    @Column(name = "mood", columnDefinition = "bigint default 0")
    private Long mood;

    @Column(name = "outdoor", columnDefinition = "bigint default 0")
    private Long outdoor;

    @Column(name = "reasonable", columnDefinition = "bigint default 0")
    private Long reasonable;

}
