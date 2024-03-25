package com.ssafy.backend.cafe.model.dto;

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
        if (latitude >= 30 && latitude <= 39) {
            this.latitude = latitude;
        }
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        if (longitude >= 123 && longitude <= 133) {
            this.longitude = longitude;
        }
    }
}
