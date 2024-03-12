package com.ssafy.backend.cafe.model.domain;


import jakarta.persistence.*;

@Entity
@Table(name = "cafe_menu")
public class CafeMenu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_seq")
    private Long menuSeq;

    @Column(name = "cafe_seq", nullable = false)
    private Long cafeSeq;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "price", length = 50)
    private String price;

    @Column(name = "image_url", length = 255)
    private String imageUrl;

    public Long getMenuSeq() {
        return menuSeq;
    }

    public Long getCafeSeq() {
        return cafeSeq;
    }

    public String getName() {
        return name;
    }

    public String getPrice() {
        return price;
    }

    public String getImageUrl() {
        return imageUrl;
    }
}
