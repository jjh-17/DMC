package com.ssafy.backend.review.service;

import com.ssafy.backend.review.model.domain.DangmocaReview;
import com.ssafy.backend.review.model.domain.LikeReview;
import com.ssafy.backend.review.model.dto.AddReviewDto;
import com.ssafy.backend.review.model.dto.LikeReivewDto;
import com.ssafy.backend.review.model.dto.UpdateReviewDto;
import com.ssafy.backend.review.model.vo.UpdateReviewVo;
import com.ssafy.backend.review.model.vo.ViewReviewVo;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ReviewService {
    List<ViewReviewVo> viewCafeReview(Long cafeSeq);

    List<ViewReviewVo> viewMemberReview(Long memberSeq);

    List<LikeReview> getLikeReview(Long membersSeq);

    List<ViewReviewVo> getByReviewSeq(List<LikeReview> reviewSeqs);

    void likeReview(LikeReivewDto likeReivewDto);

    void dislikeReview(LikeReivewDto likeReivewDto);

    boolean isLikedReview(Long reviewSeq, Long memberSeq);

    List<String> getImageUrl(Long reviewSeq);

    Long addReview(AddReviewDto addReviewDto);

    void addReviewImage(Long reviewSeq, List<MultipartFile> images) throws IOException;

    UpdateReviewVo updateReview(UpdateReviewDto updateReviewDto);

    void deleteReviewImage(Long reviewSeq);

    DangmocaReview deleteReview(Long reviewSeq);

    List<Long> getFiveStarCafeList(List<Long> memberSeqList);

    Long getFiveStarCafe(Long memberSeq);

    int getTotalRatingCount(Long memberSeq);

    int getRatingCount(Long memberSeq, int rating);

}
