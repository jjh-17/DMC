package com.ssafy.backend.cafe.model.vo;

public class CafeDetailVo {
    private Long cafeSeq;
    private String name, address, imageUrl, tag, openingHour, homepageUrl, updatedDate;
    private float rating;
    private boolean isBookmarked;

    public CafeDetailVo(Long cafeSeq, String name, String address, String imageUrl, String openingHour, String tag, String homepageUrl, String updatedDate, float rating) {
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

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public boolean isBookmarked() {
        return isBookmarked;
    }

    public void setBookmarked(boolean bookmarked) {
        isBookmarked = bookmarked;
    }
}
