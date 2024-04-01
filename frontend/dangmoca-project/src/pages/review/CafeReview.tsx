import { useEffect, useState } from "react";
import { reviewAPI } from "../../api/reviewAPI";
import DetailReviewCard from "../../components/review/DetailReviewCard";
import useCafeStore from "../../stores/cafeStore";

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
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (reviewSeq: number, reviewLiked: boolean) => {
    const isLiked = !reviewLiked;
    try {
      if (isLiked) {
        await reviewAPI.likeReview(reviewSeq);
      } else {
        await reviewAPI.unlikeReview(reviewSeq);
      }
      setLikeUpdateTrigger(prev => prev + 1);
    } catch (error) {
      console.error(error);
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
