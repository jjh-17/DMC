package com.ssafy.backend.cafe.model.vo;

import java.util.List;

public class ListCafeVo {
    private Long cafeSeq;
    private String name, address, imageUrl;
    private double distance;
    private List<String> tag, dessertTag;
    private Boolean isOpen;

    public ListCafeVo(Long cafeSeq, String name, String address, String imageUrl, double distance, List<String> tag, List<String> dessertTag, Boolean isOpen) {
        this.cafeSeq = cafeSeq;
        this.name = name;
        this.address = address;
        this.imageUrl = imageUrl;
        this.distance = distance;
        this.tag = tag;
        this.dessertTag = dessertTag;
        this.isOpen = isOpen;
    }

    public Long getCafeSeq() {
        return cafeSeq;
    }

    public void setCafeSeq(Long cafeSeq) {
        if (cafeSeq > 0) {
            this.cafeSeq = cafeSeq;
        }
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
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

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public List<String> getTag() {
        return tag;
    }

    public void setTag(List<String> tag) {
        this.tag = tag;
    }

    public List<String> getDessertTag() {
        return dessertTag;
    }

    public void setDessertTag(List<String> dessertTag) {
        this.dessertTag = dessertTag;
    }

    public Boolean isOpen() {
        return isOpen;
    }

    public void setOpen(Boolean open) {
        isOpen = open;
    }
}
