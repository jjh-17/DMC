package com.ssafy.backend.cafe.service;

import com.ssafy.backend.cafe.model.dto.CurrentLocationDto;
import com.ssafy.backend.cafe.model.mapping.CafeBookmarkListMapping;
import com.ssafy.backend.cafe.model.mapping.CafeListMapping;
import com.ssafy.backend.cafe.model.mapping.CafeSeqMapping;
import com.ssafy.backend.cafe.model.vo.CafeBookmarkListVo;
import com.ssafy.backend.cafe.model.vo.CafeDetailVo;
import com.ssafy.backend.cafe.model.vo.CafeListVo;
import com.ssafy.backend.global.exception.BaseException;
import com.ssafy.backend.member.service.MemberService;
import com.ssafy.backend.review.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.ssafy.backend.global.response.BaseResponseStatus.NOT_EXIST_USER;
import static com.ssafy.backend.global.response.BaseResponseStatus.NOT_VALID_CAFE;

@Service
public class CafeFacade {

    @Autowired
    CafeService cafeService;

    @Autowired
    MemberService memberService;

    @Autowired
    ReviewService reviewService;

    @Transactional
    public List<CafeListVo> cafeList(CurrentLocationDto currentLocationDto, Pageable pageable, String keyword) {
        List<CafeListVo> list = new ArrayList<>();

        Page<CafeListMapping> cafeMappingList;

        if (keyword.isEmpty()) {
            cafeMappingList = cafeService.cafeList(currentLocationDto, pageable);
        } else {
            cafeMappingList = cafeService.cafeSearch(currentLocationDto, keyword, pageable);
        }

        for (CafeListMapping cafeListMapping : cafeMappingList) {
            list.add(convertMappingToVo(cafeListMapping));
        }

        return list;
    }

    @Transactional
    public CafeDetailVo cafeDetail(Long cafeSeq, Long memberSeq) {
        CafeDetailVo cafeDetailVo = cafeService.cafeDetail(cafeSeq);

        cafeDetailVo.setTag(cafeService.getCafeTag(cafeSeq));

        if (memberService.isMemberNotExist(memberSeq)) {
            throw new BaseException(NOT_EXIST_USER);
        }

        if (cafeService.isCafeNotExist(cafeSeq)) {
            throw new BaseException(NOT_VALID_CAFE);
        }

        cafeDetailVo.setBookmarked(cafeService.bookmarkCheck(cafeSeq, memberSeq));

        return cafeDetailVo;
    }

    @Transactional
    public void cafeBookmark(Long cafeSeq, Long memberSeq) {
        if (memberService.isMemberNotExist(memberSeq)) {
            throw new BaseException(NOT_EXIST_USER);
        }
        if (cafeService.isCafeNotExist(cafeSeq)) {
            throw new BaseException(NOT_VALID_CAFE);
        }
        cafeService.cafeBookmark(cafeSeq, memberSeq);
    }

    @Transactional
    public void cafeBookmarkCancel(Long cafeSeq, Long memberSeq) {
        if (memberService.isMemberNotExist(memberSeq)) {
            throw new BaseException(NOT_EXIST_USER);
        }
        if (cafeService.isCafeNotExist(cafeSeq)) {
            throw new BaseException(NOT_VALID_CAFE);
        }
        cafeService.cafeBookmarkCancel(cafeSeq, memberSeq);
    }

    @Transactional
    public List<CafeBookmarkListVo> cafeBookmarkList(Long memberSeq, Pageable pageable) {
        if (memberService.isMemberNotExist(memberSeq)) {
            throw new BaseException(NOT_EXIST_USER);
        }
        List<CafeBookmarkListVo> list = new ArrayList<>();

        Page<CafeSeqMapping> cafeSeqList = cafeService.bookmarkCafeSeqList(memberSeq, pageable);

        for (CafeSeqMapping cafeSeqMapping : cafeSeqList) {
            CafeBookmarkListMapping cafeBookmarkListMapping = cafeService.cafeBookmarkList(cafeSeqMapping.getCafeSeq());

            List<String> dessertTag = cafeService.getDessertTag(cafeBookmarkListMapping.getCafeSeq());

            String openingHour = cafeBookmarkListMapping.getOpeningHour();
            Boolean isOpen = isBusinessOpen(openingHour);

            CafeBookmarkListVo cafeBookmarkListVo = new CafeBookmarkListVo(cafeBookmarkListMapping.getCafeSeq(), cafeBookmarkListMapping.getName(), cafeBookmarkListMapping.getAddress(), cafeBookmarkListMapping.getImageUrl(), cafeBookmarkListMapping.getTopTag(), dessertTag, isOpen);
            list.add(cafeBookmarkListVo);
        }

        return list;
    }

    @Transactional
    public List<CafeListVo> cafeTagRecommendList(Long memberSeq, CurrentLocationDto currentLocationDto) {
        List<String> preferTag = memberService.getPreferTag(memberSeq);

        List<CafeListMapping> cafeMappingList = cafeService.cafeTagRecommendList(preferTag, currentLocationDto);

        List<CafeListVo> list = new ArrayList<>();

        for (CafeListMapping cafeListMapping : cafeMappingList) {
            list.add(convertMappingToVo(cafeListMapping));
        }

        return list;
    }

    @Transactional
    public List<CafeListVo> cafeInfoRecommendList(Long memberSeq, CurrentLocationDto currentLocationDto) {
        List<Long> memberSeqList = memberService.getSimilarMemberList(memberSeq);

        List<Long> cafeSeqList = reviewService.getFiveStarCafeList(memberSeqList);

        Collections.shuffle(cafeSeqList);
        List<CafeListVo> list = new ArrayList<>();
        for (Long cafeSeq : cafeSeqList) {
            CafeListMapping cafeListMapping = cafeService.cafeInfoRecommendList(cafeSeq, currentLocationDto);
            list.add(convertMappingToVo(cafeListMapping));
            if (list.size() == 5) {
                break;
            }
        }

        return list;
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    private CafeListVo convertMappingToVo(CafeListMapping cafeListMapping) {
        List<String> dessertTag = cafeService.getDessertTag(cafeListMapping.getCafe_seq());

        String openingHour = cafeListMapping.getOpening_hour();
        Boolean isOpen = isBusinessOpen(openingHour);

        return new CafeListVo(cafeListMapping.getCafe_seq(), cafeListMapping.getName(), cafeListMapping.getAddress(), cafeListMapping.getImage_url(), cafeListMapping.getDistance(), cafeListMapping.getTop_tag(), dessertTag, isOpen);
    }

    // 영업중 판단 method
    private Boolean isBusinessOpen(String openingHour) {
        if (openingHour == null) {
            return null;
        }

        List<String> businessHoursList = parseOpeningHours(openingHour);
        LocalTime currentTime = LocalTime.now().withSecond(0).withNano(0);
        DayOfWeek currentDay = LocalDate.now().getDayOfWeek();

        for (String businessHours : businessHoursList) {
            if (isOpen(businessHours, currentTime, currentDay)) {
                return true;
            }
        }
        return false;
    }

    // 텍스트 파싱하여 BusinessHours 문자열 리스트로 반환하는 메소드
    private List<String> parseOpeningHours(String openingHour) {
        List<String> businessHoursList = new ArrayList<>();

        String[] lines = openingHour.split("\n");
        for (String line : lines) {
            if (line.contains("영업시간:")) {
                String businessHours = line.replace("영업시간:", "").trim();
                businessHoursList.add(businessHours);
            } else {
                businessHoursList.add(line.replace(", ", ""));
            }
        }
        return businessHoursList;
    }

    // 현재 시간이 영업 중인지 아닌지를 판단하는 메소드
    private boolean isOpen(String businessHours, LocalTime currentTime, DayOfWeek currentDay) {
        String[] parts = businessHours.replace(" ~ ", " ").split(" ");
        if (parts.length >= 2) {
            String dayInfo = parts[0];
            String[] timeParts = Arrays.copyOfRange(parts, 1, parts.length);

            if (timeParts.length >= 2) {
                LocalTime startTime = LocalTime.parse(timeParts[0].trim());
                LocalTime endTime = LocalTime.parse(timeParts[1].trim());

                if (dayInfo.contains("~")) {
                    if (isTodayBetweenGivenDays(dayInfo)) {
                        // 현재 시간이 영업시간 내에 있는지 확인
                        return currentTime.isAfter(startTime) && currentTime.isBefore(endTime.plusSeconds(1)); // endTime에 1초를 더해 endTime을 포함하도록 함
                    }
                }
                if (dayInfo.equals("매일")) {
                    // 현재 시간이 영업시간 내에 있는지 확인
                    return currentTime.isAfter(startTime) && currentTime.isBefore(endTime.plusSeconds(1)); // endTime에 1초를 더해 endTime을 포함하도록 함
                }

                if (dayInfo.contains(",")) {
                    if (isTodayIncluded(dayInfo)) {
                        // 현재 시간이 영업시간 내에 있는지 확인
                        return currentTime.isAfter(startTime) && currentTime.isBefore(endTime.plusSeconds(1)); // endTime에 1초를 더해 endTime을 포함하도록 함
                    }
                }

            }
        }
        return false;
    }

    private boolean isTodayBetweenGivenDays(String daysOfWeek) {
        LocalDate today = LocalDate.now();
        DayOfWeek currentDay = today.getDayOfWeek();

        // 요일 이름을 한글에서 영어로 변환
        String[] dayNames = {"월", "화", "수", "목", "금", "토", "일"};
        String[] englishDayNames = {"MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"};
        for (int i = 0; i < dayNames.length; i++) {
            daysOfWeek = daysOfWeek.replaceAll(dayNames[i], englishDayNames[i]);
        }

        // 주어진 문자열에서 '~'를 기준으로 요일 범위를 구분
        String[] range = daysOfWeek.split("~");
        if (range.length == 2) {
            DayOfWeek startDay = DayOfWeek.valueOf(range[0]);
            DayOfWeek endDay = DayOfWeek.valueOf(range[1]);

            // 오늘이 시작 요일보다 같거나 크고, 끝 요일보다 작거나 같으면 true 반환
            return (currentDay.compareTo(startDay) >= 0 && currentDay.compareTo(endDay) <= 0);
        }

        return false;
    }

    private boolean isTodayIncluded(String dayString) {
        // 현재 요일 가져오기
        DayOfWeek today = LocalDate.now().getDayOfWeek();

        // 요일 문자열을 세트로 변환
        Set<DayOfWeek> daySet = new HashSet<>();
        Pattern pattern = Pattern.compile("[월화수목금토일]");
        Matcher matcher = pattern.matcher(dayString);
        while (matcher.find()) {
            switch (matcher.group()) {
                case "월":
                    daySet.add(DayOfWeek.MONDAY);
                    break;
                case "화":
                    daySet.add(DayOfWeek.TUESDAY);
                    break;
                case "수":
                    daySet.add(DayOfWeek.WEDNESDAY);
                    break;
                case "목":
                    daySet.add(DayOfWeek.THURSDAY);
                    break;
                case "금":
                    daySet.add(DayOfWeek.FRIDAY);
                    break;
                case "토":
                    daySet.add(DayOfWeek.SATURDAY);
                    break;
                case "일":
                    daySet.add(DayOfWeek.SUNDAY);
                    break;
            }
        }

        // 현재 요일이 세트에 포함되어 있는지 확인
        return daySet.contains(today);
    }
    //////////////////////////////////////////////////////////////////////////
}
