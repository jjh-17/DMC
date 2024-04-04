import Swal from "sweetalert2";
import { reviewAPI } from "../../api/reviewAPI";
import ThumbUp from "../../assets/icons/thumbup.svg?react";
import { tagMapper } from "../../utils/tag";
import { useDragScroll } from "../../utils/useDragScroll";
import { memberAPI } from "../../api/memberAPI";
import NoNope from "../../assets/icons/nope-no.gif"

// interface Review {
//   reviewSeq: number;
//   memberSeq: number;
//   cafeSeq: number;
//   name: string;
//   image: string[];
//   content: string;
//   tag: string[];
//   rating: number;
//   createdDate: string;
// }

const SimpleReviewCard = ({ refreshReviews, ...review }: any) => {
  const [setRef] = useDragScroll();

  const handleRef = (node: HTMLElement | null) => {
    if (node) {
      setRef(node);
    }
  };

  if (review.deleted) {
    return null;
  }

  const deletReview = async () => {
    const myResponse = await memberAPI.getMyInfo();
    if (myResponse.data.result.memberSeq === review.memberSeq){
      try {
        const respronse = await reviewAPI.deleteReview(review.reviewSeq);
        console.log("리뷰 삭제 성공!", respronse.data);
        Swal.fire({
          title: "삭제 성공!",
          icon: "success",
        }).then(() => refreshReviews());
      } catch (error) {
        Swal.fire({
          title: "리뷰 삭제에 실패했습니다.",
          icon: "error",
        });
        console.log(error);
      }
    } else {
      Swal.fire({
        title: "권한을 확인해 주세요.",
        icon: "error",
      });
      console.error(Error);
    }
  };

  const modifyReview = () => {
    Swal.fire({
      title: "공정한 리뷰 문화!",
      icon: "error",
    });
  };

  return (
    <div className="min-w-screen max-w-[60lvw] flex flex-col gap-2 mx-auto p-6 shadow-md">
      <h2 className="text-2xl whitespace-nowrap">{review.cafeName}</h2>
      <p className="mr-0 font-light text-sm text-slate-600 whitespace-nowrap">
        {review.createdDate.split("T")[0]}
      </p>
      {/* 이미지 리스트 */}
      {review.imageUrl?.length > 0 && (
        <div
          ref={handleRef}
          className="flex overflow-x-auto my-2 no-scroll px-3 py-4 w-full"
        >
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
      <div className="p-2">
        <p className="whitespace-pre-wrap mb-2">{review.content}</p>
        {review.tag?.map((tag: any, index: any) => (
          <span className="text-sm font-light text-primary mx-1" key={index}>
            #{tagMapper.get(tag)}{" "}
          </span>
        ))}
      </div>
      <div className="flex justify-between py-2">
        <button
          onClick={() =>
            Swal.fire({
              title: "공정한 리뷰 문화!",
              imageUrl: `${NoNope}`,
              imageHeight: 300,
              imageWidth: 300
            })
          }
        >
          <ThumbUp id="svgIcon" className="mr-2" />
          <span className="font-semibold text-slate-500">
            {review.likeCount}
          </span>
        </button>
        <div className=" text-slate-500">
          <button onClick={modifyReview} className="hover:text-blue-700 mx-2">
            수정
          </button>
          <button onClick={deletReview} className="hover:text-red-700">
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleReviewCard;
