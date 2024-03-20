import { AxiosResponse } from "axios";
import { defaultAxios } from "./AuthCommon";

const END_POINT = "reviews";

interface ReviewData {
  rating: number;
  comment: string;
  // 중요!@!@!@!@!@!!!
  // 실제 데이터에 따라 수정하고 분리 필요!!!!!!
  // 중요~~~~!!!!!
}

export const reviewAPI = {
  // 리뷰 기본 CRUD
  writeReview(cafeId: string, reviewData: ReviewData): Promise<AxiosResponse> {
    return defaultAxios({
      method: "post",
      url: `${END_POINT}/cafe/${cafeId}`,
      data: reviewData,
    });
  },

  getCafeReview(cafeId: string) {
    return defaultAxios({
      method: "get",
      url: `${END_POINT}/cafe/${cafeId}`,
    });
  },

  modifyReview(reviewId: string) {
    return defaultAxios({
      method: "patch",
      url: `${END_POINT}/cafe/${reviewId}`,
    });
  },

  deleteReview(reviewId: string) {
    return defaultAxios({
      method: "delete",
      url: `${END_POINT}/cafe/${reviewId}`,
    });
  },

  // 사용자 리뷰 조회
  getMyReview(memberId: string) {
    return defaultAxios({
      method: "get",
      url: `${END_POINT}/member/${memberId}`,
    });
  },

  // 좋아요 기능
  likeReview(reviewId: string) {
    return defaultAxios({
      method: "post",
      url: `${END_POINT}/cafe/like`,
      params: {
        reviewId: reviewId,
      },
    });
  },

  unlikeReview(reviewId: string) {
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
