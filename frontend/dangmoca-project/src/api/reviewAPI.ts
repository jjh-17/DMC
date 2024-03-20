import { AxiosResponse } from "axios";
import { defaultAxios } from "./AuthCommon";

const END_POINT = "reviews";

interface ReviewData {
    rating: number;
    comment: string;
    // 필요에 따라 더 많은 필드를 추가할 수 있습니다.
  }

export const reviewAPI = {
  writeReview(cafeId: string, reviewData: ReviewData): Promise<AxiosResponse> {
    return defaultAxios({
      method: "post",
      url: `${END_POINT}/cafe/${cafeId}`,
      data: reviewData
    });
  },

  deleteReview(reviewId: string) {
    return defaultAxios({
      method: "delete",
      url: `${END_POINT}/cafe/${reviewId}`,
    });
  },
};
