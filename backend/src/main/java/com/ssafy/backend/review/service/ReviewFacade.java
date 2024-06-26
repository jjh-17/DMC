package com.ssafy.backend.review.service;

import com.ssafy.backend.cafe.model.dto.AddTagCountDto;
import com.ssafy.backend.cafe.service.CafeService;
import com.ssafy.backend.global.exception.BaseException;
import com.ssafy.backend.member.model.domain.Member;
import com.ssafy.backend.member.model.dto.AddMileageDto;
import com.ssafy.backend.member.service.MemberFacade;
import com.ssafy.backend.member.service.MemberService;
import com.ssafy.backend.review.model.domain.DangmocaReview;
import com.ssafy.backend.review.model.domain.LikeReview;
import com.ssafy.backend.review.model.dto.AddReviewDto;
import com.ssafy.backend.review.model.dto.UpdateReviewDto;
import com.ssafy.backend.review.model.vo.UpdateReviewVo;
import com.ssafy.backend.review.model.vo.ViewReviewVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.ssafy.backend.global.response.BaseResponseStatus.OOPS;

@Service
public class ReviewFacade {

    @Autowired
    ReviewService reviewService;
    @Autowired
    MemberService memberService;
    @Autowired
    MemberFacade memberFacade;
    @Autowired
    CafeService cafeService;

    public List<ViewReviewVo> viewCafeReview(Long cafeSeq, Long memberSeq) {
        List<ViewReviewVo> reviews = reviewService.viewDmcReview(cafeSeq);
        for (ViewReviewVo viewReviewVo : reviews) {
            viewReviewVo.setCafeName(cafeService.getCafeName(cafeSeq));
            viewReviewVo.setImageUrl(reviewService.getImageUrl(viewReviewVo.getReviewSeq()));
            Member member = memberService.getMemberInformation(viewReviewVo.getMemberSeq());
            viewReviewVo.setNickname(member.getNickname());
            if (member.getTitle()!=null){
                viewReviewVo.setTitle(member.getTitle());
            }
            viewReviewVo.setProfileImageUrl(member.getImageUrl());
            viewReviewVo.setLiked(reviewService.isLikedReview(viewReviewVo.getReviewSeq(), memberSeq));
            viewReviewVo.setLikeCount(reviewService.getLikeCount(viewReviewVo.getReviewSeq()));

        }
        reviews.addAll(reviewService.viewPlatformReview(cafeSeq));
        return reviews;
    }

    public List<ViewReviewVo> viewMemberReview(Long memberSeq) {
        List<ViewReviewVo> reviews = reviewService.viewMemberReview(memberSeq);
        for (ViewReviewVo viewReviewVo : reviews) {
            viewReviewVo.setCafeName(cafeService.getCafeName(viewReviewVo.getCafeSeq()));
            viewReviewVo.setImageUrl(reviewService.getImageUrl(viewReviewVo.getReviewSeq()));
            Member member = memberService.getMemberInformation(memberSeq);
            viewReviewVo.setNickname(member.getNickname());
            if (member.getTitle()!=null){
                viewReviewVo.setTitle(member.getTitle());
            }
            viewReviewVo.setProfileImageUrl(member.getImageUrl());
            viewReviewVo.setTitle(member.getTitle());
            viewReviewVo.setLiked(reviewService.isLikedReview(viewReviewVo.getReviewSeq(), memberSeq));
            viewReviewVo.setLikeCount(reviewService.getLikeCount(viewReviewVo.getReviewSeq()));
        }
        return reviews;
    }

    public List<ViewReviewVo> viewLikeReview(Long memberSeq) {
        List<LikeReview> likeReviews = reviewService.getLikeReview(memberSeq);
        List<ViewReviewVo> reviewList = reviewService.getByReviewSeq(likeReviews);
        for (ViewReviewVo viewReviewVo : reviewList) {
            viewReviewVo.setCafeName(cafeService.getCafeName(viewReviewVo.getCafeSeq()));
            viewReviewVo.setImageUrl(reviewService.getImageUrl(viewReviewVo.getReviewSeq()));
            Member member = memberService.getMemberInformation(memberSeq);
            viewReviewVo.setNickname(member.getNickname());
            if (member.getTitle()!=null){
                viewReviewVo.setTitle(member.getTitle());
            }
            viewReviewVo.setProfileImageUrl(member.getImageUrl());
            viewReviewVo.setLiked(reviewService.isLikedReview(viewReviewVo.getReviewSeq(), memberSeq));
            viewReviewVo.setLikeCount(reviewService.getLikeCount(viewReviewVo.getReviewSeq()));
        }
        return reviewList;
    }

    @Transactional
    public List<String> addReview(AddReviewDto addReviewDto) {
        Map<String, Object> analyzeResult = reviewService.analyzeReview(addReviewDto.getContent());
        Boolean isPositive = reviewService.isPositive(analyzeResult);
        Boolean isAd = false;
        if (addReviewDto.getRating() == 5) {
            isAd = reviewService.isAd(analyzeResult);
        }
        addReviewDto.setPositive(isPositive);
        addReviewDto.setAd(isAd);
        int mileage = 100;
        Long reviewSeq = reviewService.addReview(addReviewDto, isPositive);
        if (addReviewDto.getReviewImages() != null) {
            mileage += 50;
            try {
                reviewService.addReviewImage(reviewSeq, addReviewDto.getReviewImages());
            } catch (IOException e) {
                throw new BaseException(OOPS);
            }
        }

        if (analyzeResult != null && (Double) analyzeResult.get("완좋") >= 90 && addReviewDto.getRating() == 5) {
            memberService.addAdCount(addReviewDto.getMemberSeq());
        }

        memberFacade.updateAchievement(addReviewDto.getMemberSeq());

        memberService.addMileage(new AddMileageDto(addReviewDto.getMemberSeq(), mileage));
        cafeService.addTagCount(new AddTagCountDto(addReviewDto.getCafeSeq(), true, addReviewDto.getTag()));

        HashMap<String, Integer> ratingMap = new HashMap<>();
        ratingMap.put("total", reviewService.getTotalReviewCount(addReviewDto.getMemberSeq()));
        ratingMap.put("1", reviewService.getRatingCount(addReviewDto.getMemberSeq(), 1));
        ratingMap.put("3", reviewService.getRatingCount(addReviewDto.getMemberSeq(), 3));
        ratingMap.put("5", reviewService.getRatingCount(addReviewDto.getMemberSeq(), 5));

        // 별점 목록 주고 그 중 해당하는 칭호 받아오기
        return memberFacade.getAchievement(addReviewDto.getMemberSeq(), ratingMap);
    }

    @Transactional
    public void updateReview(UpdateReviewDto updateReviewDto) {
        UpdateReviewVo updateReviewVo = reviewService.updateReview(updateReviewDto);
        reviewService.deleteReviewImage(updateReviewDto.getReviewSeq());
        if (updateReviewDto.getReviewImages() != null) {
            try {
                reviewService.addReviewImage(updateReviewDto.getReviewSeq(), updateReviewDto.getReviewImages());
            } catch (IOException e) {
                throw new BaseException(OOPS);
            }
        }
        cafeService.updateReviewTag(updateReviewVo, updateReviewDto.getTag());
    }

    @Transactional
    public void deleteReview(Long reviewSeq) {
        DangmocaReview deletedReview = reviewService.deleteReview(reviewSeq);
        List<String> imageUrls = reviewService.getImageUrl(deletedReview.getReviewSeq());
        if (!imageUrls.isEmpty()) reviewService.deleteReviewImage(deletedReview.getReviewSeq());
        if (deletedReview.getTag() != null)
            cafeService.deleteTagCount(deletedReview.getCafeSeq(), deletedReview.getTag());
    }
}
