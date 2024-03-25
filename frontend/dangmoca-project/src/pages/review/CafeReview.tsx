import { useState } from "react";
import { reviewAPI } from "../../api/reviewAPI";
import DetailReviewCard from "../../components/review/DetailReviewCard";

export default function CafeReview() {
  const [ cafeReviews, setCafeReviews ] = useState();

  const getCafeReviewData = async () => {
    try {
      const data = await reviewAPI.getCafeReview(4);
      setCafeReviews(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      await reviewAPI.likeReview(4);
      // 리뷰 아이디 로직 추가해야 함
      // 좋아요 이미 누른 사람은 좋아요 취소 구현해야 함
      console.log("좋아요 성공");
    } catch (error) {
      console.log("좋아요 실패");
      console.log(error);
    }
  };

  return (
    <>
      <p>데이터 들어오면 주석 처리한 리스트 로직으로 변경</p>
      <DetailReviewCard onLikeClick={handleLike} />
      <DetailReviewCard onLikeClick={handleLike} />
      <DetailReviewCard onLikeClick={handleLike} />
      <DetailReviewCard onLikeClick={handleLike} />
    </>

    // <div className="w-fit mx-auto">
    //   <div className="flex flex-col">
    //     {cafeReviewData.map((review) => (
    //       <div key={cafe.cafeSeq}>
    //         <DetailReviewCard {...review} />
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
}
