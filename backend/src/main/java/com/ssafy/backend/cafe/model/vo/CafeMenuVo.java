package com.ssafy.backend.cafe.model.vo;

import com.ssafy.backend.global.exception.BaseException;

import static com.ssafy.backend.global.response.BaseResponseStatus.NOT_VALID_MENU_NAME;

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
        if (name == null || name.isBlank()) {
            throw new BaseException(NOT_VALID_MENU_NAME);
        }
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
