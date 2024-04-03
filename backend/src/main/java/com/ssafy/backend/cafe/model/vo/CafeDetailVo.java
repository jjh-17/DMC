package com.ssafy.backend.cafe.model.vo;

import com.ssafy.backend.global.exception.BaseException;

import java.util.List;

import static com.ssafy.backend.global.response.BaseResponseStatus.*;

public class CafeDetailVo {
    private Long cafeSeq;
    private String name, address, imageUrl, openingHour, homepageUrl, updatedDate;
    private List<String> tag;
    private Float rating;
    private boolean isBookmarked;

    public CafeDetailVo(Long cafeSeq, String name, String address, String imageUrl, String openingHour, List<String> tag, String homepageUrl, String updatedDate, Float rating) {
        setCafeSeq(cafeSeq);
        setName(name);
        setAddress(address);
        setImageUrl(imageUrl);
        setOpeningHour(openingHour);
        setTag(tag);
        setHomepageUrl(homepageUrl);
        setUpdatedDate(updatedDate);
        setRating(rating);
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
        if (address == null || address.isBlank()) {
            throw new BaseException(NOT_VALID_CAFE_ADDRESS);
        }
        this.address = address;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getOpeningHour() {
        return openingHour;
    }

    public void setOpeningHour(String openingHour) {
        this.openingHour = openingHour;
    }

    public String getHomepageUrl() {
        return homepageUrl;
    }

    public void setHomepageUrl(String homepageUrl) {
        this.homepageUrl = homepageUrl;
    }

    public String getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(String updatedDate) {
        this.updatedDate = updatedDate;
    }

    public List<String> getTag() {
        return tag;
    }

    public void setTag(List<String> tag) {
        this.tag = tag;
    }

    public Float getRating() {
        return rating;
    }

    public void setRating(Float rating) {
        this.rating = rating;
    }

    public boolean isBookmarked() {
        return isBookmarked;
    }

    public void setBookmarked(boolean bookmarked) {
        isBookmarked = bookmarked;
    }
}
