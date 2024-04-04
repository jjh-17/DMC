package com.ssafy.backend.cafe.service;

import com.ssafy.backend.cafe.model.dto.CurrentLocationDto;
import com.ssafy.backend.cafe.model.mapping.CafeBookmarkListMapping;
import com.ssafy.backend.cafe.model.mapping.CafeListMapping;
import com.ssafy.backend.cafe.model.mapping.CafeSeqMapping;
import com.ssafy.backend.cafe.model.vo.CafeBookmarkListVo;
import com.ssafy.backend.cafe.model.vo.CafeDetailVo;
import com.ssafy.backend.cafe.model.vo.CafeListVo;
import com.ssafy.backend.global.exception.BaseException;
import com.ssafy.backend.global.util.GlobalUtil;
import com.ssafy.backend.member.service.MemberService;
import com.ssafy.backend.review.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

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
    public Map<String, Object> cafeList(CurrentLocationDto currentLocationDto, Pageable pageable, String keyword) {
        Map<String, Object> resultMap = new HashMap<>();

        List<CafeListVo> list = new ArrayList<>();

        Page<CafeListMapping> cafeMappingList;

        if (keyword.isBlank()) {
            cafeMappingList = cafeService.cafeList(currentLocationDto, pageable);
        } else {
            cafeMappingList = cafeService.cafeSearch(currentLocationDto, keyword, pageable);
        }

        for (CafeListMapping cafeListMapping : cafeMappingList) {
            list.add(convertMappingToVo(cafeListMapping));
        }

        resultMap.put("list", list);
        resultMap.put("totalPages", cafeMappingList.getTotalPages());
        return resultMap;
    }

    @Transactional
    public CafeDetailVo cafeDetail(Long cafeSeq, Long memberSeq) {
        CafeDetailVo cafeDetailVo = cafeService.cafeDetail(cafeSeq);

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
    public Map<String, Object> cafeBookmarkList(Long memberSeq, Pageable pageable) {
        if (memberService.isMemberNotExist(memberSeq)) {
            throw new BaseException(NOT_EXIST_USER);
        }

        Map<String, Object> resultMap = new HashMap<>();

        List<CafeBookmarkListVo> list = new ArrayList<>();

        Page<CafeSeqMapping> cafeSeqList = cafeService.bookmarkCafeSeqList(memberSeq, pageable);

        for (CafeSeqMapping cafeSeqMapping : cafeSeqList) {
            CafeBookmarkListMapping cafeBookmarkListMapping = cafeService.cafeBookmarkList(cafeSeqMapping.getCafeSeq());

            List<String> dessertTag = cafeService.getDessertTag(cafeBookmarkListMapping.getCafeSeq());

            String openingHour = cafeBookmarkListMapping.getOpeningHour();
            Boolean isOpen = isOpenNow(openingHour);

            CafeBookmarkListVo cafeBookmarkListVo = new CafeBookmarkListVo(cafeBookmarkListMapping.getCafeSeq(), cafeBookmarkListMapping.getName(), cafeBookmarkListMapping.getAddress(), cafeBookmarkListMapping.getImageUrl(), GlobalUtil.tagsToList(cafeBookmarkListMapping.getTopTag()), dessertTag, isOpen);
            list.add(cafeBookmarkListVo);
        }

        resultMap.put("list", list);
        resultMap.put("totalPages", cafeSeqList.getTotalPages());
        return resultMap;
    }

    @Transactional
    public List<CafeListVo> cafeTagRecommendList(Long memberSeq, CurrentLocationDto currentLocationDto) {
        // 나의 선호 태그 갖고오고
        List<String> preferTag = memberService.getPreferTag(memberSeq);

        // 해당 선호 태그를 포함한 카페 교집합 많은 순, 거리 순으로 가져옴
        List<CafeListMapping> cafeMappingList = cafeService.cafeTagRecommendList(preferTag, currentLocationDto);

        List<CafeListVo> list = new ArrayList<>();

        for (CafeListMapping cafeListMapping : cafeMappingList) {
            list.add(convertMappingToVo(cafeListMapping));
        }

        return list;
    }

    @Transactional
    public List<CafeListVo> cafeInfoRecommendList(Long memberSeq, CurrentLocationDto currentLocationDto) {
        // 나와 비슷한 사용자들 가져옴
        List<Long> memberSeqList = memberService.getSimilarMemberList(memberSeq);

        // 해당 사용자들이 5점을 준 카페들 가져옴
        List<Long> cafeSeqList = reviewService.getFiveStarCafeList(memberSeqList);

        // 그 중 랜덤으로 5개 return
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


    @Transactional
    public Map<String, Object> cafeRatingRecommendList(Long memberSeq, CurrentLocationDto currentLocationDto) {
        if (memberService.isMemberNotExist(memberSeq)) {
            throw new BaseException(NOT_EXIST_USER);
        }

        Map<String, Object> resultMap = new HashMap<>();

        // 내가 5점을 준 카페 seq 중 랜덤 하나 갖고오기
        Long stdCafeSeq = reviewService.getFiveStarCafe(memberSeq);

        // 랜덤으로 갖고온 카페의 이름
        String name = cafeService.getCafeName(stdCafeSeq);
        resultMap.put("name", name);

        // 해당 카페와 상위 3개 태그가 일치하는 순으로 가져오기
        List<CafeListMapping> cafeMappingList = cafeService.cafeRatingRecommendList(stdCafeSeq, currentLocationDto);

        List<CafeListVo> list = new ArrayList<>();

        for (CafeListMapping cafeListMapping : cafeMappingList) {
            list.add(convertMappingToVo(cafeListMapping));
        }

        resultMap.put("list", list);

        return resultMap;
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    private CafeListVo convertMappingToVo(CafeListMapping cafeListMapping) {
        List<String> dessertTag = cafeService.getDessertTag(cafeListMapping.getCafe_seq());

        String openingHour = cafeListMapping.getOpening_hour();
        Boolean isOpen = isOpenNow(openingHour);

        return new CafeListVo(cafeListMapping.getCafe_seq(), cafeListMapping.getName(), cafeListMapping.getAddress(), cafeListMapping.getImage_url(), cafeListMapping.getDistance(), GlobalUtil.tagsToList(cafeListMapping.getTop_tag()), dessertTag, isOpen);
    }


    private Boolean isOpenNow(String businessHoursString) {
        if (businessHoursString == null || businessHoursString.isBlank()) {
            return null;
        }

        LocalDateTime now = LocalDateTime.now();
        LocalTime currentTime = now.toLocalTime();
        DayOfWeek currentDay = now.getDayOfWeek();

        String[] hoursArray = businessHoursString.split(" / ");

        try {
            for (String hours : hoursArray) {
                String[] parts = hours.trim().split("\\s+");

                // 요일 범위와 시간 범위를 구분하여 처리
                if (parts.length == 1) { // 라벨인 경우
                    continue;
                }

                String dayRange = parts[0];
                String[] timeRange = new String[]{parts[1], parts[3]};
                String startTimeString = timeRange[0];
                String endTimeString = timeRange[1];

                if (!dayRange.matches(".*(월|화|수|목|금|토|일|매일|공휴일).*")) {
                    continue;
                }

                // "00:00 ~ 24:00" 시간 범위가 주어졌을 경우 "00:00 ~ 00:00"으로 변경
                if (endTimeString.equals("24:00")) {
                    endTimeString = "00:00";
                }

                // "매일"인 경우 모든 요일을 나타냄
                if (dayRange.equals("매일")) {
                    LocalTime startTime = parseTime(startTimeString);
                    LocalTime endTime = parseTime(endTimeString);
                    if (currentTime.isAfter(startTime) && currentTime.isBefore(endTime)) {
                        return true;
                    }
                    continue; // 다음 영업시간 확인
                }

                // "공휴일"인 경우 주말을 나타냄
                if (dayRange.equals("공휴일")) {
                    DayOfWeek startDay = parseDayOfWeek("토");
                    DayOfWeek endDay = parseDayOfWeek("일");
                    LocalTime startTime = parseTime(startTimeString);
                    LocalTime endTime = parseTime(endTimeString);
                    if (currentTime.isAfter(startTime) && currentTime.isBefore(endTime)) {
                        return true;
                    }
                    continue; // 다음 영업시간 확인
                }

                if (dayRange.contains("~")) { // 요일 범위가 있는 경우 처리
                    String[] days = dayRange.split("~");
                    DayOfWeek startDay = parseDayOfWeek(days[0]);
                    DayOfWeek endDay = parseDayOfWeek(days[1]);

                    if (startDay == null || endDay == null) {
                        return null;
                    }

                    if (currentDay.compareTo(startDay) >= 0 && currentDay.compareTo(endDay) <= 0) {
                        LocalTime startTime = parseTime(startTimeString);
                        LocalTime endTime = parseTime(endTimeString);
                        if (currentTime.isAfter(startTime) && currentTime.isBefore(endTime)) {
                            return true;
                        }
                    }
                } else if (dayRange.contains(",")) { // 쉼표로 나누어져있는 경우 처리
                    String[] days = dayRange.split(",");
                    for (String day : days) {
                        if (day == null || day.isBlank()) {
                            return null;
                        }

                        DayOfWeek dayOfWeek = parseDayOfWeek(day);
                        if (dayOfWeek == currentDay) {
                            LocalTime startTime = parseTime(startTimeString);
                            LocalTime endTime = parseTime(endTimeString);
                            if (currentTime.isAfter(startTime) && currentTime.isBefore(endTime)) {
                                return true;
                            }
                        }
                    }
                } else { // 단일 요일인 경우 처리
                    DayOfWeek dayOfWeek = parseDayOfWeek(dayRange);
                    if (dayOfWeek == currentDay) {
                        LocalTime startTime = parseTime(startTimeString);
                        LocalTime endTime = parseTime(endTimeString);
                        if (currentTime.isAfter(startTime) && currentTime.isBefore(endTime)) {
                            return true;
                        }
                    }
                }
            }
        } catch (Exception e) { // 날짜 에러로 파싱 실패 시 null
            return null;
        }

        return false;
    }

    private DayOfWeek parseDayOfWeek(String dayOfWeekString) {
        return switch (dayOfWeekString) {
            case "월" -> DayOfWeek.MONDAY;
            case "화" -> DayOfWeek.TUESDAY;
            case "수" -> DayOfWeek.WEDNESDAY;
            case "목" -> DayOfWeek.THURSDAY;
            case "금" -> DayOfWeek.FRIDAY;
            case "토" -> DayOfWeek.SATURDAY;
            case "일" -> DayOfWeek.SUNDAY;
            default -> null;
        };
    }

    private LocalTime parseTime(String timeString) {
        String[] parts = timeString.split(":");
        int hour = Integer.parseInt(parts[0]);
        int minute = Integer.parseInt(parts[1].replace("시", "").replace("분", ""));
        return LocalTime.of(hour, minute);
    }

    //////////////////////////////////////////////////////////////////////////
}
