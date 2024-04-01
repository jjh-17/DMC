package com.ssafy.backend.cafe.model.domain;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "cafe_info")
public class CafeInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cafeSeq;

    @Column(name = "latitude", nullable = false)
    private double latitude;

    @Column(name = "longitude", nullable = false)
    private double longitude;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "kakao_name", length = 100)
    private String kakaoName;

    @Column(name = "naver_name", length = 100)
    private String naverName;

    @Column(name = "image_url", columnDefinition = "TEXT")
    private String imageUrl;

    @Column(name = "address", nullable = false, length = 255)
    private String address;

    @Column(name = "tel", length = 50)
    private String tel;

    @Column(name = "rating")
    private Float rating;

    @Column(name = "kakao_rating")
    private Float kakaoRating;

    @Column(name = "opening_hour", length = 100)
    private String openingHour;

    @Column(name = "homepage_url", columnDefinition = "TEXT")
    private String homepageUrl;

    @Column(name = "region_code", length = 255)
    private String regionCode;

    @Column(name = "updated_date", nullable = false, length = 255)
    private String updatedDate;

    @Column(name = "top_tag", length = 255)
    private String topTag;

    @Column(name = "is_deleted", nullable = false)
    @ColumnDefault("false")
    private boolean isDeleted = false;

    public CafeInfo() {
    }

    public String getHomepageUrl() {
        return homepageUrl;
    }

    public Long getCafeSeq() {
        return cafeSeq;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public String getName() {
        return name;
    }

    public String getKakaoName() {
        return kakaoName;
    }

    public String getNaverName() {
        return naverName;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getAddress() {
        return address;
    }

    public String getTel() {
        return tel;
    }

    public Float getRating() {
        return rating;
    }

    public Float getKakaoRating() {
        return kakaoRating;
    }

    public String getOpeningHour() {
        return openingHour;
    }

    public String getRegionCode() {
        return regionCode;
    }

    public String getTopTag() {
        return topTag;
    }

    public String getUpdatedDate() {
        return updatedDate;
    }

    public boolean isDeleted() {
        return isDeleted;
    }
}
