package com.ssafy.backend.review.service;

import com.ssafy.backend.cafe.model.dto.AddTagCountDto;
import com.ssafy.backend.cafe.service.CafeService;
import com.ssafy.backend.member.model.domain.Member;
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

import java.util.List;

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
    public void addReview(AddReviewDto addeReviewDto, List<String> imageUrls, List<String> tagList) {
        Long reviewSeq = reviewService.addReview(addeReviewDto);
        if (imageUrls != null) reviewService.addReviewImage(reviewSeq, imageUrls);
        cafeService.addTagCount(new AddTagCountDto(addeReviewDto.getCafeSeq(), true, tagList));
    }

    @Transactional
    public void updateReview(UpdateReviewDto updateReviewDto, List<String> imageUrls, List<String> newTagList) {
        UpdateReviewVo updateReviewVo = reviewService.updateReview(updateReviewDto);
        reviewService.updateReviewImage(updateReviewDto.getReviewSeq(), imageUrls);
        cafeService.updateReviewTag(updateReviewVo, newTagList);
    }

    @Transactional
    public void deleteReview(Long reviewSeq) {
        DangmocaReview deletedReview = reviewService.deleteReview(reviewSeq);
        if (deletedReview.getTag() != null) cafeService.deleteTagCount(deletedReview.getCafeSeq(), deletedReview.getTag());
    }
}
