import { AxiosResponse } from "axios";
import { authAxios, defaultAxios } from "./AuthCommon";

const END_POINT = "reviews";

interface ReviewData {
  content: string | null;
  reviewImages: string[] | null;
  tag: string[] | null;
  rating: number;

  // 중요!@!@!@!@!@!!!
  // 실제 데이터에 따라 수정하고 분리 필요!!!!!!
  // 중요~~~~!!!!!
}

export const reviewAPI = {
  // 리뷰 기본 CRUD
  writeReview(cafeId: number, reviewData: ReviewData): Promise<AxiosResponse> {
    return authAxios({
      method: "post",
      url: `${END_POINT}/cafe/${cafeId}`,
      data: reviewData,
    });
  },

  getCafeReview(cafeId: number) {
    return defaultAxios({
      method: "get",
      url: `${END_POINT}/cafe/${cafeId}`,
    });
  },

  modifyReview(reviewId: number) {
    return defaultAxios({
      method: "patch",
      url: `${END_POINT}/cafe/${reviewId}`,
    });
  },

  deleteReview(reviewId: number) {
    return defaultAxios({
      method: "delete",
      url: `${END_POINT}/cafe/${reviewId}`,
    });
  },

  // 사용자 리뷰 조회
  getMyReview(memberId: number) {
    return defaultAxios({
      method: "get",
      url: `${END_POINT}/member/${memberId}`,
    });
  },

  // 좋아요 기능
  likeReview(reviewId: number) {
    return defaultAxios({
      method: "post",
      url: `${END_POINT}/cafe/like`,
      params: {
        reviewId: reviewId,
      },
    });
  },

  unlikeReview(reviewId: number) {
    return defaultAxios({
      method: "delete",
      url: `${END_POINT}/cafe/like`,
      params: {
        reviewId: reviewId,
      },
    });
  },

  // 본인이 좋아요한 리뷰 조회
  getLikeReview() {
    return defaultAxios({
      method: "get",
      url: `${END_POINT}/member/like`,
    });
  },
};
