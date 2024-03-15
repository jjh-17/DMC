package com.ssafy.backend.cafe.model.mapping;

public interface CafeListMapping {
    Long getCafe_seq();

    String getName();

    String getAddress();

    String getImage_url();

    String getOpening_hour();

    double getDistance();
}
