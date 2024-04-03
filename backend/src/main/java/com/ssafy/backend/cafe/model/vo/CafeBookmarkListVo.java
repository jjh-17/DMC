package com.ssafy.backend.cafe.model.vo;

import com.ssafy.backend.global.exception.BaseException;

import java.util.List;

import static com.ssafy.backend.global.response.BaseResponseStatus.*;

public class CafeBookmarkListVo {
    private Long cafeSeq;
    private String name, tag, address, imageUrl;
    private List<String> dessertTag;
    private Boolean isOpen;

    public CafeBookmarkListVo(Long cafeSeq, String name, String address, String imageUrl, String tag, List<String> dessertTag, Boolean isOpen) {
        setCafeSeq(cafeSeq);
        setName(name);
        setAddress(address);
        setImageUrl(imageUrl);
        setTag(tag);
        setDessertTag(dessertTag);
        setOpen(isOpen);
    }

    public Long getCafeSeq() {
        return cafeSeq;
    }

    public void setCafeSeq(Long cafeSeq) {
        if (cafeSeq == null || cafeSeq <= 0) {
            throw new BaseException(NOT_VALID_CAFE);
        }
        this.cafeSeq = cafeSeq;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        if (name == null || name.isBlank()) {
            throw new BaseException(NOT_VALID_CAFE_NAME);
        }
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public List<String> getDessertTag() {
        return dessertTag;
    }

    public void setDessertTag(List<String> dessertTag) {
        this.dessertTag = dessertTag;
    }

    public Boolean getOpen() {
        return isOpen;
    }

    public void setOpen(Boolean open) {
        isOpen = open;
    }
}
