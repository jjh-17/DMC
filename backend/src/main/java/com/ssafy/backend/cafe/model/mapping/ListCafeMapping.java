package com.ssafy.backend.cafe.model.mapping;

public interface ListCafeMapping {
    Long getCafe_seq();

    String getName();

    String getAddress();

    String getImage_url();

    String getOpeningHour();

    double getDistance();
}
