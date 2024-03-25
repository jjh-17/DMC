package com.ssafy.backend.review.service;

import com.ssafy.backend.cafe.model.dto.AddTagCountDto;
import com.ssafy.backend.cafe.service.CafeService;
import com.ssafy.backend.global.exception.BaseException;
import com.ssafy.backend.member.model.domain.Member;
import com.ssafy.backend.member.model.dto.AddMileageDto;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static com.ssafy.backend.global.response.BaseResponseStatus.OOPS;

@Service
public class ReviewFacade {

    @Autowired
    ReviewService reviewService;

    @Autowired
    MemberService memberService;

    @Autowired
    private CafeService cafeService;

    public List<ViewReviewVo> viewCafeReview(Long cafeSeq, Long memberSeq) {
        List<ViewReviewVo> reviews = reviewService.viewCafeReview(cafeSeq);
        for (ViewReviewVo viewReviewVo : reviews) {
            viewReviewVo.setImageUrl(reviewService.getImageUrl(viewReviewVo.getReviewSeq()));
            Member member = memberService.getMemberInformation(memberSeq);
            viewReviewVo.setNickname(member.getNickname());
            viewReviewVo.setProfileImageUrl(member.getImageUrl());
            viewReviewVo.setLiked(reviewService.isLikedReview(viewReviewVo.getReviewSeq(), memberSeq));
        }
        return reviews;
    }

    public List<ViewReviewVo> viewMemberReview(Long memberSeq) {
        List<ViewReviewVo> reviews = reviewService.viewMemberReview(memberSeq);
        for (ViewReviewVo viewReviewVo : reviews) {
            viewReviewVo.setImageUrl(reviewService.getImageUrl(viewReviewVo.getReviewSeq()));
            Member member = memberService.getMemberInformation(memberSeq);
            viewReviewVo.setNickname(member.getNickname());
            viewReviewVo.setProfileImageUrl(member.getImageUrl());
        }
        return reviews;
    }

    public List<ViewReviewVo> viewLikeReview(Long memberSeq) {
        List<LikeReview> likeReviews = reviewService.getLikeReview(memberSeq);
        List<ViewReviewVo> reviewList = reviewService.getByReviewSeq(likeReviews);
        for (ViewReviewVo viewReviewVo : reviewList) {
            viewReviewVo.setImageUrl(reviewService.getImageUrl(viewReviewVo.getReviewSeq()));
            Member member = memberService.getMemberInformation(memberSeq);
            viewReviewVo.setNickname(member.getNickname());
            viewReviewVo.setProfileImageUrl(member.getImageUrl());
        }
        return reviewList;
    }

    @Transactional
    public void addReview(AddReviewDto addeReviewDto, List<MultipartFile> reviewImages, List<String> tagList) {
        int mileage = 100;
        Long reviewSeq = reviewService.addReview(addeReviewDto);
        if (!reviewImages.isEmpty()) {
            mileage += 50;
            try {
                reviewService.addReviewImage(reviewSeq, reviewImages);
            } catch (IOException e) {
                throw new BaseException(OOPS);
            }
        }
        memberService.addMileage(new AddMileageDto(addeReviewDto.getMemberSeq(), mileage));
        cafeService.addTagCount(new AddTagCountDto(addeReviewDto.getCafeSeq(), true, tagList));
    }

    @Transactional
    public void updateReview(UpdateReviewDto updateReviewDto, List<MultipartFile> reviewImages, List<String> newTagList) {
        UpdateReviewVo updateReviewVo = reviewService.updateReview(updateReviewDto);
        reviewService.deleteReviewImage(updateReviewDto.getReviewSeq());
        if (reviewImages != null){
            try {
                reviewService.addReviewImage(updateReviewDto.getReviewSeq(), reviewImages);
            } catch (IOException e) {
                throw new BaseException(OOPS);
            }
        }
        cafeService.updateReviewTag(updateReviewVo, newTagList);
    }

    @Transactional
    public void deleteReview(Long reviewSeq) {
        DangmocaReview deletedReview = reviewService.deleteReview(reviewSeq);
        List<String> imageUrls = reviewService.getImageUrl(deletedReview.getReviewSeq());
        if (!imageUrls.isEmpty()) reviewService.deleteReviewImage(deletedReview.getReviewSeq());
        if (deletedReview.getTag() != null) cafeService.deleteTagCount(deletedReview.getCafeSeq(), deletedReview.getTag());
    }
}
