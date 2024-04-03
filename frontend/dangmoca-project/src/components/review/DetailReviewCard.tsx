import { useDragScroll } from "../../utils/useDragScroll";
import EmptyBean from "../../assets/icons/empty-coffee-bean.svg?react";
import FullBean from "../../assets/icons/full-coffee-bean.svg?react";
import EmptyHeart from "../../assets/icons/empty-heart.svg?react";
import FullHeart from "../../assets/icons/full-heart.svg?react";
import { tagMapper } from "../../utils/tag";
import defaultImg from '../../assets/icons/profile.svg';
import KakaoIconUrl from '../../assets/icons/kakao.png';
import NaverIconUrl from '../../assets/icons/naver.png';
import CoffeeBeanIconUrl from '../../assets/icons/coffeebean.svg';

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
    <div className="min-w-screen max-w-[600px] flex flex-col gap-4 border-t-2 border-primary2 mx-auto p-8 my-6">
      <div className="flex flex-row items-center">
        <div className="w-24 h-24 bg-brown-500 rounded-full overflow-hidden mr-4">
          <img
            src={review.profileImage || defaultImg}
            alt="프로필 이미지"
            className="rounded-full w-24 h-24 p-1 object-cover border-4 border-primary"
          />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-xl md:text-2xl mx-3 items-baseline">
            {review.nickname}
            <img src={review.platform == "K" ? KakaoIconUrl : review.platform == "N" ? NaverIconUrl : CoffeeBeanIconUrl} className="inline-block w-6 h-6 mx-2" />
          </span>
          <div className="text-lg">{review.userTitle}
          </div>
          <button />
        </div>
      </div>

      {/* 이미지 리스트 */}
      {review.imageUrl?.length > 0 && (
        <div ref={handleRef} className="flex overflow-x-auto p-4 no-scroll">
          {review.imageUrl.map((img: any, index: any) => (
            <img
              key={index}
              src={img}
              alt={`Review ${review.reviewSeq} Image ${index}`}
              className="w-32 h-32 mr-2 object-cover"
            />
          ))}
        </div>
      )}
      <div className="flex flex-col w-auto h-52 my-4 justify-around border-primary2 border-2 rounded-2xl bg-primary bg-opacity-5 shadow-lg">
        {/* 리뷰 별점 & 리뷰 날짜 */}
        {
          review.rating > 0 && (
            <div className="flex justify-between items-center px-4 py-2">
              <div className="flex flex-row space-x-1">
                {renderBeans(review.rating)}
              </div>
              <p className="font-light text-slate-700">{review.createdDate.split("T")[0]}</p>
            </div>

          )
        }

        {/* 리뷰 내용 */}
        <p className="px-5 py-2 ">{review.content}</p>

        <div className="flex justify-between items-center px-4">
          {/* 좋아요 */}
          <button onClick={onLikeClick}>
            {review.liked ? (
              <>
                <FullHeart id="svgIcon" className="mr-2" />
                <span className="font-semibold text-lg text-red-500">{review.likeCount}</span>
              </>
            ) : (
              <>
                <EmptyHeart id="svgIcon" className="mr-2" />
                <span className="font-semibold text-lg text-slate-500">{review.likeCount}</span>
              </>
            )}
          </button>

          {/* 태그 리스트 */}
          {Array.isArray(review.tag) && review.tag.length > 0 && (
            <div className="flex overflow-x-auto p-4">
              {review.tag.map((tag: string, index: number) => (
                <span key={index} className="mx-1 text-rose-800">
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
