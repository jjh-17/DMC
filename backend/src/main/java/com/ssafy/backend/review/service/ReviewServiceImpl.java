package com.ssafy.backend.review.service;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.ssafy.backend.global.exception.BaseException;
import com.ssafy.backend.global.util.GlobalUtil;
import com.ssafy.backend.global.util.S3UploadUtil;
import com.ssafy.backend.review.model.domain.DangmocaReview;
import com.ssafy.backend.review.model.domain.LikeReview;
import com.ssafy.backend.review.model.domain.PlatformReview;
import com.ssafy.backend.review.model.domain.ReviewImage;
import com.ssafy.backend.review.model.dto.AddReviewDto;
import com.ssafy.backend.review.model.dto.LikeReivewDto;
import com.ssafy.backend.review.model.dto.UpdateReviewDto;
import com.ssafy.backend.review.model.mapping.CafeSeqMapping;
import com.ssafy.backend.review.model.repository.DangmocaReviewRepository;
import com.ssafy.backend.review.model.repository.LikeReviewRepository;
import com.ssafy.backend.review.model.repository.PlatformReviewRepository;
import com.ssafy.backend.review.model.repository.ReviewImageRepository;
import com.ssafy.backend.review.model.vo.UpdateReviewVo;
import com.ssafy.backend.review.model.vo.ViewReviewVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

import static com.ssafy.backend.global.response.BaseResponseStatus.*;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    DangmocaReviewRepository dangmocaReviewRepository;

    @Autowired
    PlatformReviewRepository platformReviewRepository;

    @Autowired
    ReviewImageRepository reviewImageRepository;

    @Autowired
    LikeReviewRepository likeReviewRepository;

    @Autowired
    S3UploadUtil s3UploadUtil;

    @Override
    public List<ViewReviewVo> viewDmcReview(Long cafeSeq) {
        List<DangmocaReview> dangmocaReviews = dangmocaReviewRepository.findAllByCafeSeqOrderByCreatedDateDesc(cafeSeq);
        List<ViewReviewVo> reviews = new ArrayList<>();
        for (DangmocaReview dangmocaReview : dangmocaReviews) {
            reviews.add(dangmocaReview.toVo());
        }
        return reviews;
    }

    @Override
    public List<ViewReviewVo> viewPlatformReview(Long cafeSeq) {
        List<PlatformReview> platformReviews = platformReviewRepository.findAllByCafeSeqOrderByCreatedDateDesc(cafeSeq);
        List<ViewReviewVo> reviews = new ArrayList<>();
        for (PlatformReview platformReview : platformReviews) {
            reviews.add(platformReview.toVo());
        }
        return reviews;
    }

    @Override
    public List<ViewReviewVo> viewMemberReview(Long memberSeq) {
        List<DangmocaReview> dangmocaReviews = dangmocaReviewRepository.findAllByMemberSeqOrderByCreatedDateDesc(memberSeq);
        List<ViewReviewVo> reviews = new ArrayList<>();
        for (DangmocaReview dangmocaReview : dangmocaReviews) {
            reviews.add(dangmocaReview.toVo());
        }
        return reviews;
    }

    @Override
    public List<LikeReview> getLikeReview(Long membersSeq) {
        return likeReviewRepository.findAllByMemberSeq(membersSeq);
    }

    @Override
    public List<ViewReviewVo> getByReviewSeq(List<LikeReview> likeReviews) {
        List<ViewReviewVo> reviewList = new ArrayList<>();
        for (LikeReview likereview : likeReviews) {
            reviewList.add(dangmocaReviewRepository.findByReviewSeq(likereview.getReviewSeq()).toVo());
        }
        return reviewList;
    }

    @Override
    public void likeReview(LikeReivewDto likeReivewDto) {
        if (likeReviewRepository.findByReviewSeqAndMemberSeq(likeReivewDto.getReviewSeq(), likeReivewDto.getMemberSeq()) != null) {
            throw new BaseException(ALREADY_EXIST_LIKE);
        }
        likeReviewRepository.save(
                LikeReview.builder()
                        .memberSeq(likeReivewDto.getMemberSeq())
                        .reviewSeq(likeReivewDto.getReviewSeq())
                        .build()
        );
    }

    @Override
    @Transactional
    public void dislikeReview(LikeReivewDto likeReivewDto) {
        likeReviewRepository.deleteByReviewSeqAndMemberSeq(likeReivewDto.getReviewSeq(), likeReivewDto.getMemberSeq());
    }

    @Override
    public boolean isLikedReview(Long reviewSeq, Long memberSeq) {
        return likeReviewRepository.findByReviewSeqAndMemberSeq(reviewSeq, memberSeq) != null;
    }

    @Override
    public List<String> getImageUrl(Long reviewSeq) {
        List<ReviewImage> reviewImages = reviewImageRepository.findAllByReviewSeq(reviewSeq);
        List<String> imageUrls = new ArrayList<>();
        for (ReviewImage reviewImage : reviewImages) {
            imageUrls.add(reviewImage.getImageUrl());
        }
        return imageUrls;
    }

    @Override
    public Integer getLikeCount(Long reviewSeq) {
        return dangmocaReviewRepository.countByReviewSeq(reviewSeq);
    }

    @Override
    public Long addReview(AddReviewDto addReviewDto, Boolean isPositive) {
        return dangmocaReviewRepository.save(
                DangmocaReview.builder()
                        .memberSeq(addReviewDto.getMemberSeq())
                        .cafeSeq(addReviewDto.getCafeSeq())
                        .content(addReviewDto.getContent())
                        .tag(GlobalUtil.tagsToString(addReviewDto.getTag()))
                        .createdDate(addReviewDto.getCreatedDate())
                        .rating(addReviewDto.getRating())
                        .isPositive(isPositive)
                        .isDeleted(addReviewDto.isDeleted())
                        .updatedDate(addReviewDto.getCreatedDate())
                        .build()
        ).getReviewSeq();
    }

    @Override
    public void addReviewImage(Long reviewSeq, List<MultipartFile> reviewImages) throws IOException {
        for (MultipartFile reviewImage : reviewImages) {
            String imageUrl = null;
            imageUrl = s3UploadUtil.uploadReviewImage(reviewImage, reviewSeq);
            reviewImageRepository.save(
                    ReviewImage.builder()
                            .reviewSeq(reviewSeq)
                            .imageUrl(imageUrl)
                            .build()
            );
        }
    }

    @Override
    public UpdateReviewVo updateReview(UpdateReviewDto updateReviewDto) {
        DangmocaReview dangmocaReview = dangmocaReviewRepository.findById(updateReviewDto.getReviewSeq()).orElseThrow(() -> new BaseException(NOT_EXIST_REVIEW));
        if (dangmocaReview.getMemberSeq() != updateReviewDto.getMemberSeq()) {
            throw new BaseException(NO_SAME_USER);
        }
        UpdateReviewVo updateReviewVo = new UpdateReviewVo(dangmocaReview.getCafeSeq(), dangmocaReview.getTag());
        dangmocaReview.updateReview(updateReviewDto.getContent(), GlobalUtil.tagsToString(updateReviewDto.getTag()), updateReviewDto.getRating(), updateReviewDto.getUpdatedDate());
        dangmocaReviewRepository.save(dangmocaReview);
        return updateReviewVo;
    }

    @Override
    public void deleteReviewImage(Long reviewSeq) {
        List<ReviewImage> originReviewImages = reviewImageRepository.findAllByReviewSeq(reviewSeq);
        if (!originReviewImages.isEmpty()) {
            for (ReviewImage originReviewImage : originReviewImages) {
                s3UploadUtil.deleteImg(originReviewImage.getImageUrl());
            }
            reviewImageRepository.deleteAll(originReviewImages);
        }
    }

    @Override
    public DangmocaReview deleteReview(Long reviewSeq) {
        DangmocaReview dangmocaReview = dangmocaReviewRepository.findById(reviewSeq).orElseThrow(() -> new BaseException(NOT_EXIST_REVIEW));
        dangmocaReview.deleteReview();
        dangmocaReviewRepository.save(dangmocaReview);
        return dangmocaReview;
    }

    @Override
    public List<Long> getFiveStarCafeList(List<Long> memberSeqList) {
        List<CafeSeqMapping> cafeSeqMappings = dangmocaReviewRepository.findDistinctByMemberSeqInAndRating(memberSeqList, 5);

        List<Long> list = new ArrayList<>();
        for (CafeSeqMapping cafeSeqMapping : cafeSeqMappings) {
            list.add(cafeSeqMapping.getCafeSeq());
        }

        return list;
    }

    @Override
    public Long getFiveStarCafe(Long memberSeq) {
        List<CafeSeqMapping> cafeSeqMappings = dangmocaReviewRepository.findDistinctByMemberSeqInAndRating(new ArrayList<>(List.of(memberSeq)), 5);

        if (cafeSeqMappings == null || cafeSeqMappings.isEmpty()) {
            throw new BaseException(NO_FIVE_STAR_REVIEW);
        }

        Random random = new Random();
        int randomIndex = random.nextInt(cafeSeqMappings.size());

        return cafeSeqMappings.get(randomIndex).getCafeSeq();
    }

    @Override
    public int getTotalReviewCount(Long memberSeq) {
        return Math.toIntExact(dangmocaReviewRepository.countByMemberSeqAndIsDeletedFalse(memberSeq));
    }

    @Override
    public int getRatingCount(Long memberSeq, int rating) {
        return Math.toIntExact(dangmocaReviewRepository.countByMemberSeqAndRatingAndIsDeletedFalse(memberSeq, rating));
    }

    @Override
    public Map<String, Object> analyzeReview(String content) {
        // Todo : 실제 url로 변경 필요
        String requestUrl = "http://j10a607a.p.ssafy.io:8083/predict";

        String jsonContent = String.valueOf(convertToJsonObject(content));

        try {
            URL url = new URL(requestUrl);

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            connection.setRequestMethod("POST");

            connection.setRequestProperty("Content-Type", "application/json");

            connection.setDoOutput(true);
            OutputStream os = connection.getOutputStream();
            os.write(jsonContent.getBytes());
            os.flush();
            os.close();

            int responseCode = connection.getResponseCode();

            if (responseCode != 200) {
                return null;
            }

            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String resultLine;
            StringBuilder sb = new StringBuilder();
            while ((resultLine = br.readLine()) != null) {
                sb.append(resultLine);
            }
            br.close();

            return convertJsonToHashMap(sb.toString());
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Boolean isPositive(Map<String, Object> analyzeResult) {
        if (analyzeResult == null) {
            return null;
        }

        Double negative = (Double) analyzeResult.get("최악") + (Double) analyzeResult.get("별로");
        Double positive = (Double) analyzeResult.get("좋음") + (Double) analyzeResult.get("완좋");

        if (Math.abs(negative - positive) <= 10) {
            return null;
        }

        return positive > negative;
    }

    @Override
    public Boolean isAd(Map<String, Object> analyzeResult) {
        if (analyzeResult == null) {
            return false;
        }
        Double love = (Double) analyzeResult.get("완좋");
        return love >= 90.0;
    }

    @Override
    public boolean isRatingBalanced(Long memberSeq) {
        Map<Integer, Long> ratingMap = new HashMap<>();

        for (int i = 1; i <= 5; i++) {
            ratingMap.put(i, dangmocaReviewRepository.countByMemberSeqAndRatingAndIsDeletedFalse(memberSeq, i));
        }

        // 별점이 총 몇 개인지 계산
        long totalRatings = ratingMap.values().stream().mapToLong(Long::longValue).sum();
        if (totalRatings == 0) {
            return true;
        }

        for (int star = 1; star <= 5; star++) {
            // 특정 별점의 개수
            Long specificRatingCount = ratingMap.get(star);

            // 특정 별점의 비율 계산
            double ratio = (double) specificRatingCount / totalRatings;

            if (ratio >= 0.9) { // 한 별점에 9할 이상 남겼으면
                return false;
            }
        }

        return true;
    }

    private JsonObject convertToJsonObject(String content) {
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("review_sentence", content);
        return jsonObject;
    }

    private Map<String, Object> convertJsonToHashMap(String jsonString) {
        Gson gson = new Gson();
        JsonObject jsonObject = gson.fromJson(jsonString, JsonObject.class);

        Map<String, Object> resultMap = new HashMap<>();

        JsonArray resultArray = jsonObject.getAsJsonArray("result");
        for (JsonElement element : resultArray) {
            JsonArray innerArray = element.getAsJsonArray();
            String key = innerArray.get(0).getAsString();
            Double value = innerArray.get(1).getAsDouble();
            resultMap.put(key, value);
            if (resultMap.size() == 6) {
                return resultMap;
            }
        }

        return resultMap;
    }


}
