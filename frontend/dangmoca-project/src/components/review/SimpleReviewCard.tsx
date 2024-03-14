interface Review {
  reviewSeq: number;
  memberSeq: number;
  cafeSeq: number;
  name: string;
  image: string[];
  content: string;
  tag: string[];
  rating: number;
  createdDate: string;
}

const SimpleReviewCard = (review : Review) => {
  return (
    <div className="w-40 flex flex-col border-b-2">
      {/* 이미지 리스트 */}
      {review.image.length > 0 && (
        <div className="flex overflow-x-auto p-4">
          {review.image.map((img, index) => (
            <img key={index} src={img} alt={`Review ${review.reviewSeq} Image ${index}`} className="h-24 w-auto mr-2" />
          ))}
        </div>
      )}

      {/* 리뷰 네임 & 리뷰 날짜 */}
      <div className="flex justify-between items-center px-4 py-2">
        <h2 className="text-left">{review.name}</h2>
        <p className="text-right">{review.createdDate}</p>
      </div>

      {/* 리뷰 내용 */}
      <p className="px-4 py-2">{review.content}</p>

      {/* 리뷰 별점 & 수정, 삭제 버튼 */}
      <div className="flex justify-between items-center px-4 py-2">
        <h2 className="text-left">{review.rating}⭐</h2>
        <div>
          <button className="mr-2">수정</button>
          <button>삭제</button>
        </div>
      </div>    
    </div>
  );
};

export default SimpleReviewCard;
