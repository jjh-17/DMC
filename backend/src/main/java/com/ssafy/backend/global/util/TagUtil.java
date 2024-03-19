package com.ssafy.backend.global.util;

import com.ssafy.backend.cafe.model.domain.TagCount;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class TagUtil {
    public static void tagCountUtil(TagCount tagCount, String tagName) {
        switch (tagName) {
            case "cagong":
                tagCount.setCagong(tagCount.getCagong() + 1);
                break;
            case "cute":
                tagCount.setCute(tagCount.getCute() + 1);
                break;
            case "date":
                tagCount.setDate(tagCount.getDate() + 1);
                break;
            case "large":
                tagCount.setLarge(tagCount.getLarge() + 1);
                break;
            case "petit":
                tagCount.setPetit(tagCount.getPetit() + 1);
                break;
            case "calm":
                tagCount.setCalm(tagCount.getCalm() + 1);
                break;
            case "sns_pick":
                tagCount.setSnsPick(tagCount.getSnsPick() + 1);
                break;
            case "cozy":
                tagCount.setCozy(tagCount.getCozy() + 1);
                break;
            case "coffee":
                tagCount.setCoffee(tagCount.getCoffee() + 1);
                break;
            case "dessert":
                tagCount.setDessert(tagCount.getDessert() + 1);
                break;
            case "view":
                tagCount.setView(tagCount.getView() + 1);
                break;
            case "mood":
                tagCount.setMood(tagCount.getMood() + 1);
                break;
            case "outdoor":
                tagCount.setOutdoor(tagCount.getOutdoor() + 1);
                break;
            case "reasonable":
                tagCount.setReasonable(tagCount.getReasonable() + 1);
                break;
            default:
                break;
        }
    }

    public static void tagPutUtil(Map<String, Long> tag, TagCount tagCount) {
        tag.put("cagong", tagCount.getCagong());
        tag.put("cute", tagCount.getCute());
        tag.put("date", tagCount.getDate());
        tag.put("large", tagCount.getLarge());
        tag.put("petit", tagCount.getPetit());
        tag.put("calm", tagCount.getCalm());
        tag.put("sns_pick", tagCount.getSnsPick());
        tag.put("cozy", tagCount.getCozy());
        tag.put("coffee", tagCount.getCoffee());
        tag.put("dessert", tagCount.getDessert());
        tag.put("view", tagCount.getView());
        tag.put("mood", tagCount.getMood());
        tag.put("outdoor", tagCount.getOutdoor());
        tag.put("reasonable", tagCount.getReasonable());
    }
}
