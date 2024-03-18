package com.ssafy.backend.cafe.model.vo;

public class CafeMenuVo {
    private String name, price, imageUrl;

    public CafeMenuVo(String name, String price, String imageUrl) {
        setName(name);
        setPrice(price);
        setImageUrl(imageUrl);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
