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
import java.util.Map;

public interface ReviewService {
    List<ViewReviewVo> viewDmcReview(Long cafeSeq);

    List<ViewReviewVo> viewPlatformReview(Long cafeSeq);

    List<ViewReviewVo> viewMemberReview(Long memberSeq);

    List<LikeReview> getLikeReview(Long membersSeq);

    List<ViewReviewVo> getByReviewSeq(List<LikeReview> reviewSeqs);

    void likeReview(LikeReivewDto likeReivewDto);

    void dislikeReview(LikeReivewDto likeReivewDto);

    boolean isLikedReview(Long reviewSeq, Long memberSeq);

    List<String> getImageUrl(Long reviewSeq);

    Integer getLikeCount(Long reviewSeq);

    Long addReview(AddReviewDto addReviewDto, Boolean isPositive);

    void addReviewImage(Long reviewSeq, List<MultipartFile> images) throws IOException;

    UpdateReviewVo updateReview(UpdateReviewDto updateReviewDto);

    void deleteReviewImage(Long reviewSeq);

    DangmocaReview deleteReview(Long reviewSeq);

    List<Long> getFiveStarCafeList(List<Long> memberSeqList);

    Long getFiveStarCafe(Long memberSeq);

    int getTotalReviewCount(Long memberSeq);

    int getRatingCount(Long memberSeq, int rating);

    Map<String, Object> analyzeReview(String content);

    Boolean isPositive(Map<String, Object> analyzeResult);

    boolean isRatingBalanced(Long memberSeq);
}
