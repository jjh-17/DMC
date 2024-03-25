import { useEffect, useState } from "react";
import { reviewAPI } from "../../api/reviewAPI";
import DetailReviewCard from "../../components/review/DetailReviewCard";


// API 응답 객체에 대한 인터페이스 정의
interface Review {
  reviewSeq: number;
  memberSeq: number;
  cafeSeq: number;
  nickname: string;
  profileImageUrl: string;
  content: string;
  tag: string;
  rating: number;
  updatedDate: string;
  createdDate: string;
  imageUrl: string[];
  deleted: boolean;
  liked: boolean;
}

interface ApiResponse {
  message: string;
  code: number;
  result: Review[];
  success: boolean;
}

export default function CafeReview() {
  const [cafeReviews, setCafeReviews] = useState<Review[] | undefined>(undefined);

  const getCafeReviewData = async () => {
    try {
      const response = await reviewAPI.getCafeReview(4);
      const data: ApiResponse = response.data;
      setCafeReviews(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (reviewSeq:number) => {
    try {
      await reviewAPI.likeReview(reviewSeq);
      // 리뷰 아이디 로직 추가해야 함
      // 좋아요 이미 누른 사람은 좋아요 취소 구현해야 함
      console.log("좋아요 성공");
    } catch (error) {
      console.log("좋아요 실패");
      console.log(error);
    }
  };

  useEffect(() => {
    getCafeReviewData();
  }, []);


  return (
    <>
      <p>데이터 들어오면 주석 처리한 리스트 로직으로 변경</p>
      <DetailReviewCard onLikeClick={handleLike} />
      <DetailReviewCard onLikeClick={handleLike} />
      <DetailReviewCard onLikeClick={handleLike} />
      <DetailReviewCard onLikeClick={handleLike} />
    {/* <div className="w-fit mx-auto"> */}
      {/* <div className="flex flex-col"> */}
        {cafeReviews?.map((review) => (
          <div key={review.reviewSeq}>
            <DetailReviewCard {...review} onLikeClick={handleLike(review.reviewSeq)} liked={review.liked}/>
          </div>
        ))}
      {/* </div> */}
    {/* </div> */}
    </>

  );
}
