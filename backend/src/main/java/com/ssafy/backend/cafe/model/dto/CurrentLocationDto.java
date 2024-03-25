package com.ssafy.backend.cafe.model.dto;

import com.ssafy.backend.global.exception.BaseException;

import static com.ssafy.backend.global.response.BaseResponseStatus.NOT_VALID_LOCATION;

public class CurrentLocationDto {
    private double latitude, longitude;

    public CurrentLocationDto(double latitude, double longitude) {
        setLatitude(latitude);
        setLongitude(longitude);
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        if (latitude >= 32 && latitude <= 44) {
            this.latitude = latitude;
        } else {
            throw new BaseException(NOT_VALID_LOCATION);
        }
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        if (longitude >= 123 && longitude <= 133) {
            this.longitude = longitude;
        } else {
            throw new BaseException(NOT_VALID_LOCATION);
        }
    }
}
