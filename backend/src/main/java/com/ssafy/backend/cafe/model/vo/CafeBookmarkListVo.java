package com.ssafy.backend.cafe.model.vo;

import java.util.List;

public class CafeBookmarkListVo {
    private Long cafeSeq;
    private String name, address, imageUrl;
    private List<String> tag, dessertTag;
    private Boolean isOpen;

    public CafeBookmarkListVo(Long cafeSeq, String name, String address, String imageUrl) {
        setCafeSeq(cafeSeq);
        setName(name);
        setAddress(address);
        setImageUrl(imageUrl);
    }

    public CafeBookmarkListVo(Long cafeSeq, String name, String address, String imageUrl, List<String> tagList, List<String> dessertTag, Boolean isOpen) {
        setCafeSeq(cafeSeq);
        setName(name);
        setAddress(address);
        setImageUrl(imageUrl);
        setTag(tagList);
        setDessertTag(dessertTag);
        setOpen(isOpen);
    }

    public Long getCafeSeq() {
        return cafeSeq;
    }

    public void setCafeSeq(Long cafeSeq) {
        this.cafeSeq = cafeSeq;
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

    public Boolean getOpen() {
        return isOpen;
    }

    public void setOpen(Boolean open) {
        isOpen = open;
    }
}
