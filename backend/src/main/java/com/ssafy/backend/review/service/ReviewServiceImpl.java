package com.ssafy.backend.review.service;

import com.ssafy.backend.global.exception.BaseException;
import com.ssafy.backend.review.model.domain.DangmocaReview;
import com.ssafy.backend.review.model.domain.ReviewImage;
import com.ssafy.backend.review.model.dto.AddReviewDto;
import com.ssafy.backend.review.model.dto.UpdateReviewDto;
import com.ssafy.backend.review.model.repository.DangmocaReviewRepository;
import com.ssafy.backend.review.model.repository.ReviewImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.ssafy.backend.global.response.BaseResponseStatus.NOT_EXIST_REVIEW;
import static com.ssafy.backend.global.response.BaseResponseStatus.NO_SAME_USER;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    DangmocaReviewRepository dangmocaReviewRepository;

    @Autowired
    ReviewImageRepository reviewImageRepository;

    @Override
    public Long addReview(AddReviewDto addReviewDto) {
        return dangmocaReviewRepository.save(
                DangmocaReview.builder()
                        .memberSeq(addReviewDto.getMemberSeq())
                        .cafeSeq(addReviewDto.getCafeSeq())
                        .content(addReviewDto.getContent())
                        .tag(tagsToString(addReviewDto.getTag()))
                        .createdDate(addReviewDto.getCreatedDate())
                        .rating(addReviewDto.getRating())
                        .isDeleted(addReviewDto.isDeleted())
                        .updatedDate(addReviewDto.getCreatedDate())
                        .build()
        ).getReviewSeq();
    }

    @Override
    public void addReviewImage(Long reviewSeq, List<String> imageUrls) {
        for (String imageUrl : imageUrls) {
            reviewImageRepository.save(
                    ReviewImage.builder()
                            .reviewSeq(reviewSeq)
                            .imageUrl(imageUrl)
                            .build()
            );
        }
    }

    @Override
    public void updateReview(UpdateReviewDto updateReviewDto) {
        DangmocaReview dangmocaReview = dangmocaReviewRepository.findById(updateReviewDto.getReviewSeq()).orElseThrow(() -> new BaseException(NOT_EXIST_REVIEW));
        if (dangmocaReview.getMemberSeq() != updateReviewDto.getMemberSeq()) {
            throw new BaseException(NO_SAME_USER);
        }
        dangmocaReview.updateReview(updateReviewDto.getContent(), tagsToString(updateReviewDto.getTag()), updateReviewDto.getRating(), updateReviewDto.getUpdatedDate());
        dangmocaReviewRepository.save(dangmocaReview);
    }

    @Override
    public void updateReviewImage(Long reviewSeq, List<String> imageUrls) {
        List<ReviewImage> reviewImages = reviewImageRepository.findAllByReviewSeq(reviewSeq);
        if (reviewImages != null) {
            reviewImageRepository.deleteAll(reviewImages);
        }
        if (imageUrls != null) {
            addReviewImage(reviewSeq, imageUrls);
        }
    }

    private String tagsToString(List<String> tags) {
        if (tags == null) {
            return null;
        } else {
            return tags.toString();
        }
    }
}
