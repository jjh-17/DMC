package com.ssafy.backend.review.service;

import com.ssafy.backend.review.model.domain.DangmocaReview;
import com.ssafy.backend.review.model.domain.LikeReview;
import com.ssafy.backend.review.model.dto.AddReviewDto;
import com.ssafy.backend.review.model.dto.UpdateReviewDto;
import com.ssafy.backend.review.model.vo.ViewReviewVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ReviewFacade {

    @Autowired
    ReviewService reviewService;

    public List<ViewReviewVo> viewReview(Long cafeSeq) {
        List<ViewReviewVo> reviews = reviewService.viewReview(cafeSeq);
        for (ViewReviewVo viewReviewVo : reviews) {
            viewReviewVo.setImageUrl(reviewService.getImageUrl(viewReviewVo.getReviewSeq()));
            // viewReviewVo.setNickname(memberService.getNickname(viewReviewVo.getMemberSeq());
            viewReviewVo.setNickname("임시 닉네임");
        }
        return reviews;
    }

    public List<ViewReviewVo> viewMemberReview(Long memberSeq) {
        List<ViewReviewVo> reviews = reviewService.viewMemberReview(memberSeq);
        for (ViewReviewVo viewReviewVo : reviews) {
            viewReviewVo.setImageUrl(reviewService.getImageUrl(viewReviewVo.getReviewSeq()));
            // viewReviewVo.setNickname(memberService.getNickname(viewReviewVo.getMemberSeq());
            viewReviewVo.setNickname("임시 닉네임");
        }
        return reviews;
    }

    public List<ViewReviewVo> viewLikeReview(Long membersSeq) {
        List<LikeReview> likeReviews = reviewService.getLikeReview(membersSeq);
        List<ViewReviewVo> reviewList = reviewService.getByReviewSeq(likeReviews);
        for (ViewReviewVo viewReviewVo : reviewList) {
            viewReviewVo.setImageUrl(reviewService.getImageUrl(viewReviewVo.getReviewSeq()));
            // viewReviewVo.setNickname(memberService.getNickname(viewReviewVo.getMemberSeq());
            viewReviewVo.setNickname("임시 닉네임");
        }
        return reviewList;
    }

    @Transactional
    public void addReview(AddReviewDto addeReviewDto, List<String> imageUrls) {
        Long reviewSeq = reviewService.addReview(addeReviewDto);
        reviewService.addReviewImage(reviewSeq, imageUrls);
    }

    @Transactional
    public void updateReview(UpdateReviewDto updateReviewDto, List<String> imageUrls) {
        reviewService.updateReview(updateReviewDto);
        reviewService.updateReviewImage(updateReviewDto.getReviewSeq(), imageUrls);
    }
}
