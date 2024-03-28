import { useDragScroll } from "../../utils/useDragScroll";
import EmptyBean from "../../assets/icons/empty-coffee-bean.svg?react";
import FullBean from "../../assets/icons/full-coffee-bean.svg?react";
import EmptyHeart from "../../assets/icons/empty-heart.svg?react";
import FullHeart from "../../assets/icons/full-heart.svg?react";
import { tagMapper } from "../../utils/tag";

// 타입 다 임시 any임 나중에 다고쳐야함.

// review
const DetailReviewCard = ({ onLikeClick, ...review }: any) => {
  const [setRef] = useDragScroll();

  const handleRef = (node: HTMLElement | null) => {
    if (node) {
      setRef(node);
    }
  };

  <button className="w-8 h-8">
    <FullBean className="w-full h-full" />
  </button>;

  const renderBeans = (rating: number) => {
    const beans = [];

    for (let i = 1; i <= 5; i++) {
      const key = `bean-${i}`;
      if (i <= rating) {
        beans.push(<FullBean key={key} className="w-8 h-8" />);
      } else {
        beans.push(<EmptyBean key={key} className="w-8 h-8" />);
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
      {review.imageUrl.length > 0 && (
        <div ref={handleRef} className="flex overflow-x-auto p-4 no-scroll">
          {review.imageUrl.map((img:any, index:any) => (
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
          <button onClick={onLikeClick}>
            {review.liked ? (
              <>
                <FullHeart id="svgIcon" className="mr-2" />
                <span className="font-semibold text-red-500">{review.likeCount}</span>
              </>
            ) : (
              <>
                <EmptyHeart id="svgIcon" className="mr-2" />
                <span className="font-semibold text-slate-500">{review.likeCount}</span>
              </>
            )}
          </button>

          {/* 태그 리스트 */}
          {Array.isArray(review.tag) && review.tag.length > 0 && (
            <div className="flex overflow-x-auto p-4">
              {review.tag.map((tag:any, index:any) => (
                <span key={index} className="mr-2">
                  #{tagMapper.get(tag)}
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
