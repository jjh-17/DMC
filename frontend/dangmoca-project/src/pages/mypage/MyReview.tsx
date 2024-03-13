import SimpleReviewCard from "../../components/cafe/SimpleReviewCard";

export default function MyReview() {
  const dummyReviews = [
    {
      reviewSeq: 0,
      memberSeq: 0,
      cafeSeq: 0,
      name: "카페 남부",
      image: ["src/assets/pictures/naver_map.png","src/assets/pictures/naver_map.png","src/assets/pictures/naver_map.png","src/assets/pictures/naver_map.png","src/assets/pictures/naver_map.png"],
      content: "맛잇엇요",
      tag: ["조용한"],
      rating: 4,
      createdDate: "2024-01-02",
    },
    {
      reviewSeq: 1,
      memberSeq: 0,
      cafeSeq: 0,
      name: "카페 남부",
      image: ["src/assets/pictures/naver_map.png","src/assets/pictures/naver_map.png","src/assets/pictures/naver_map.png","src/assets/pictures/naver_map.png"],
      content: "맛잇엇요",
      tag: ["조용한"],
      rating: 4,
      createdDate: "2024-01-02",
    },
    {
      reviewSeq: 2,
      memberSeq: 0,
      cafeSeq: 0,
      name: "카페 남부",
      image: ["src/assets/pictures/naver_map.png","src/assets/pictures/naver_map.png","src/assets/pictures/naver_map.png"],
      content: "맛잇엇요",
      tag: ["조용한"],
      rating: 4,
      createdDate: "2024-01-02",
    },
  ];

  return (
    <>
      <div>
        {dummyReviews.map((review) => (
          <SimpleReviewCard key={review.reviewSeq} {...review} />
        ))}
      </div>
    </>
  );
};
