import { useEffect, useState } from "react";
import { reviewAPI } from "../../api/reviewAPI";
import DetailReviewCard from "../../components/review/DetailReviewCard";
import useCafeStore from "../../stores/cafeStore";

// API 응답 객체에 대한 인터페이스 정의
interface Review {
  reviewSeq: number;
  memberSeq: number;
  cafeSeq: number;
  nickname: string;
  profileImageUrl: string;
  content: string;
  tag: string[];
  rating: number;
  updatedDate: string;
  createdDate: string;
  imageUrl: string[];
  deleted: boolean;
  likeCount: number;
  liked: boolean;
}

interface ApiResponse {
  message: string;
  code: number;
  result: Review[];
  success: boolean;
}

export default function CafeReview() {
  const [cafeReviews, setCafeReviews] = useState<Review[] | undefined>(
    undefined
  );
  const selectCafeSeq = useCafeStore((state) => state.selectedCafeSeq);
  const [likeUpdateTrigger, setLikeUpdateTrigger] = useState(0);
  console.log(likeUpdateTrigger)

  const getCafeReviewData = async () => {
    try {
      const response = await reviewAPI.getCafeReview(selectCafeSeq);
      const data: ApiResponse = response.data;
      setCafeReviews(data.result);

      console.log(`${selectCafeSeq} 카페 리뷰 가져오기 성공!`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // 좋아요 개수 백엔드에서 추가 중
  const handleLike = async (reviewSeq: number, reviewLiked: boolean) => {
    const isLiked = !reviewLiked;
    try {
      if (isLiked) {
        await reviewAPI.likeReview(reviewSeq);
        console.log("좋아요 성공");
      } else {
        await reviewAPI.unlikeReview(reviewSeq);
        console.log("좋다 말았어요 성공");
      }
      setLikeUpdateTrigger(prev => prev + 1);
    } catch (error) {
      console.log(isLiked ? "좋아요 실패" : "좋다 말았어요 실패");
      console.log(error);
    }
  };

  useEffect(() => {
    getCafeReviewData();
  }, [likeUpdateTrigger]);

  return (
    <>
      {cafeReviews?.map((review) => (
        <div key={review.reviewSeq}>
          <DetailReviewCard
            {...review}
            onLikeClick={() => handleLike(review.reviewSeq, review.liked)}
          />
        </div>
      ))}
    </>
  );
}
