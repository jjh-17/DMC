package com.ssafy.backend.cafe.model.vo;

import com.ssafy.backend.global.exception.BaseException;

import java.util.List;

import static com.ssafy.backend.global.response.BaseResponseStatus.NOT_VALID_DISTANCE;

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
        if (distance < 0) {
            throw new BaseException(NOT_VALID_DISTANCE);
        }
        this.distance = distance;
    }
}
