package com.ssafy.backend.review.service;

import com.ssafy.backend.review.model.domain.DangmocaReview;
import com.ssafy.backend.review.model.domain.ReviewImage;
import com.ssafy.backend.review.model.dto.AddReviewDto;
import com.ssafy.backend.review.model.repository.DangmocaReviewRepository;
import com.ssafy.backend.review.model.repository.ReviewImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService{

    @Autowired
    DangmocaReviewRepository dangmocaReviewRepository;

    @Autowired
    ReviewImageRepository reviewImageRepository;

    @Override
    public Long addReview(AddReviewDto addReviewDto) {
        String tags = null;
        if (addReviewDto.getTag() != null){
            tags = addReviewDto.getTag().toString();
        }
        return dangmocaReviewRepository.save(
                DangmocaReview.builder()
                        .memberSeq(addReviewDto.getMemberSeq())
                        .cafeSeq(addReviewDto.getCafeSeq())
                        .content(addReviewDto.getContent())
                        .tag(tags)
                        .createdDate(addReviewDto.getCreatedDate())
                        .rating(addReviewDto.getRating())
                        .isDeleted(addReviewDto.isDeleted())
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
}
