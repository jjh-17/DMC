package com.ssafy.backend.cafe.model.vo;

import java.util.List;

public class CafeListVo extends CafeBookmarkListVo {
    private double distance;

    public CafeListVo(Long cafeSeq, String name, String address, String imageUrl, double distance, List<String> tag, List<String> dessertTag, Boolean isOpen) {
        super(cafeSeq, name, address, imageUrl, tag, dessertTag, isOpen);
        setDistance(distance);
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }
}
