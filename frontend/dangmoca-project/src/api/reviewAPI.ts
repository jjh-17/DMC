/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import { authAxios } from "./AuthCommon";

const END_POINT = "reviews";

// interface ReviewData {
//   content: string | null;
//   reviewImages: string[] | null;
//   tag: string[] | null;
//   rating: number;

//   // 중요!@!@!@!@!@!!!
//   // 실제 데이터에 따라 수정하고 분리 필요!!!!!!
//   // 중요~~~~!!!!!
// }

export const reviewAPI = {
  // 리뷰 기본 CRUD
  writeReview(cafeId: number, reviewFormData: any): Promise<AxiosResponse> {
    alert(cafeId);
    return authAxios({
      method: "post",
      url: `${END_POINT}/cafe/${cafeId}`,
      data: reviewFormData,
    });
  },

  getCafeReview(cafeId: number) {
    return authAxios({
      method: "get",
      url: `${END_POINT}/cafe/${cafeId}`,
    });
  },

  modifyReview(reviewId: number) {
    return authAxios({
      method: "patch",
      url: `${END_POINT}/cafe/${reviewId}`,
    });
  },

  deleteReview(reviewId: number) {
    return authAxios({
      method: "delete",
      url: `${END_POINT}/cafe/${reviewId}`,
    });
  },

  // 사용자 리뷰 조회
  getMyReview(memberId: number) {
    return authAxios({
      method: "get",
      url: `${END_POINT}/member/${memberId}`,
    });
  },

  // 좋아요 기능
  likeReview(reviewId: number) {
    return authAxios({
      method: "post",
      url: `${END_POINT}/cafe/like`,
      params: {
        reviewid: reviewId,
      },
    });
  },

  unlikeReview(reviewId: number) {
    return authAxios({
      method: "delete",
      url: `${END_POINT}/cafe/like`,
      params: {
        reviewid: reviewId,
      },
    });
  },

  // 본인이 좋아요한 리뷰 조회
  getLikeReview() {
    return authAxios({
      method: "get",
      url: `${END_POINT}/member/like`,
    });
  },
};
