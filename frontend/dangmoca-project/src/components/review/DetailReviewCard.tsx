import { useDragScroll } from "../../utils/useDragScroll";
import EmptyBean from "../../assets/icons/empty-coffee-bean.svg?react";
import FullBean from "../../assets/icons/full-coffee-bean.svg?react";
import ThumbUp from "../../assets/icons/thumbup.svg?react";

interface Review {
  //   reviewSeq: number;
  //   memberSeq: number;
  //   cafeSeq: number;
  //   name: string;
  //   image: string[];
  //   content: string;
  //   tag: string[];
  //   rating: number;
  //   createdDate: string;
  reviewSeq: number;
  memberSeq: number;
  cafeSeq: number;
  name: string;
  nickname: string;
  image: string[];
  content: string;
  tag: string[];
  rating: number;
  createdDate: string;
  isLiked: boolean;
  isDeleted: boolean;
  // 나중에 추가 받아야 함
  profileImage: string;
  userTitle: string;
}

const DetailReviewCard = () => {
  const [ref] = useDragScroll();

  const review = {
    reviewSeq: 0,
    memberSeq: 0,
    cafeSeq: 0,
    name: "카페 남부",
    image: [
      "/src/assets/testpic/1.jpg",
      "/src/assets/testpic/2.jpg",
      "/src/assets/testpic/3.jpg",
      "/src/assets/testpic/4.jpg",
      "/src/assets/testpic/5.jpg",
    ],
    content: "맛잇엇요",
    tag: ["조용한", "시끄러운"],
    rating: 4,
    createdDate: "2024-01-02",

    profileImage: "/src/assets/testpic/1.jpg",
    userTitle: "하루 커피 5잔",
    nickName: "DMC",
  };

  <button className="w-8 h-8">
    <FullBean className="w-full h-full" />
  </button>;

  const renderBeans = (rating: number) => {
    const beans = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        beans.push(<FullBean className="w-8 h-8" />);
      } else {
        beans.push(<EmptyBean className="w-8 h-8" />);
      }
    }
    return beans;
  };

  return (
    <div className="min-w-screen max-w-[600px] flex flex-col gap-4 border-b-[1px] border-slate-500 mx-auto p-6">
      <div className="flex flex-row items-center">
        <div className="w-24 h-24 bg-brown-500 rounded-full overflow-hidden mr-4">
          <img
            src={review.profileImage}
            alt="프로필 이미지"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-lg ml-3">{review.nickName}</div>
          <div className="text-lg">{review.userTitle}</div>
          <button />
        </div>
      </div>

      {/* 이미지 리스트 */}
      {review.image.length > 0 && (
        <div ref={ref} className="flex overflow-x-auto p-4 no-scroll">
          {review.image.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Review ${review.reviewSeq} Image ${index}`}
              className="w-32 h-32 mr-2 object-cover"
            />
          ))}
        </div>
      )}
      <div className="flex flex-col w-auto h-52 justify-around border-primary border-2 rounded-2xl shadow-lg">
        {/* 리뷰 별점 & 리뷰 날짜 */}
        <div className="flex justify-between items-center px-4 py-2">
          <div className="flex flex-row space-x-1">
            {renderBeans(review.rating)}
          </div>

          <p>{review.createdDate}</p>
        </div>

        {/* 리뷰 내용 */}
        <p className="px-5 py-2">{review.content}</p>

        <div className="flex justify-between items-center px-4">
        {/* 좋아요 */}
        <button onClick={() => console.log('좋아요')}>
          <ThumbUp id="svgIcon" className='mr-2' />
          <span className='font-semibold text-slate-500'>50</span>
        </button>

        {/* 태그 리스트 */}
        {review.tag.length > 0 && (
          <div className="flex overflow-x-auto p-4">
            {review.tag.map((tag, index) => (
              <span key={index} className="mr-2">
                {tag}
              </span>
            ))}
          </div>
        )}

        </div>
      </div>
    </div>
  );
};

export default DetailReviewCard;
