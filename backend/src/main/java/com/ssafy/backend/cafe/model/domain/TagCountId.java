package com.ssafy.backend.cafe.model.domain;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TagCountId implements Serializable {
    private Long cafeSeq;
    private boolean own;
}
