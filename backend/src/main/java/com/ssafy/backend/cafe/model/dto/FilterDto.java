package com.ssafy.backend.cafe.model.dto;

import java.util.List;

public class FilterDto {
    private Boolean isOpen;
    private List<String> tagList;

    public FilterDto(Boolean isOpen, List<String> tagList) {
        setOpen(isOpen);
        setTagList(tagList);
    }

    public Boolean getOpen() {
        return isOpen;
    }

    public void setOpen(Boolean open) {
        isOpen = open;
    }

    public List<String> getTagList() {
        return tagList;
    }

    public void setTagList(List<String> tagList) {
        this.tagList = tagList;
    }
}
