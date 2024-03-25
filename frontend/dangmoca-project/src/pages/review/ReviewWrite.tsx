import { useRef, useState } from "react";
import Button from "../../components/common/Button";
import ReviewRating from "../../components/review/ReviewRating";
import { useDragScroll } from "../../utils/useDragScroll";
import { reviewAPI } from "../../api/reviewAPI";

interface Review {
  reviewImages: string[];
  content: string;
  tag: string[];
  rating: number;
}

// TODO : 헤더명 리뷰 작성하기'
export default function ReviewWrite() {
  const [setRef] = useDragScroll();

  const handleRef = (node: HTMLElement | null) => {
    if (node) {
      setRef(node);
    }
  };

  const [review, setReview] = useState<Review>({
    reviewImages: [],
    content: "",
    tag: [],
    rating: 0,
  });

  const { reviewImages } = review;

  // 리뷰 별점 관련
  const handleRatingChange = (rating: number) => {
    setReview((prevReview) => ({
      ...prevReview,
      rating: rating,
    }));
  };

  // 리뷰 내용 관련
  const reviewContentRef = useRef<HTMLTextAreaElement>(null);

  const handleBlur = (event: any) => {
    // textarea의 현재 값을 content 상태에 저장
    setReview((prevReview) => ({
      ...prevReview,
      content: event.target.value,
    }));

    console.log("리뷰 내용 변경");
  };

  // 이미지 관련
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const newImage: string = reader.result as string;
        setReview((prevReview) => ({
          ...prevReview,
          reviewImages: [...prevReview.reviewImages, newImage],
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  // 태그 관련
  // const [tags, setTags] = useState<string[]>([]);

  // 리뷰 작성
  const writeReviewData = async () => {
    // event: React.MouseEvent<HTMLButtonElement>
    // event.preventDefault();
    try {
      await reviewAPI.writeReview(1, review);
    } catch (error) {
      console.error("리뷰 작성 에러: ", error);
    }
    console.log("업로드", review); // 백 연결 후 review 출력해보기
  };

  const labelClass = "lg:text-2xl";

  return (
    <div className="min-w-screen max-w-[600px] flex flex-col gap-4 border-b-[1px] border-slate-500 mx-auto p-6">
      <label className="text-center text-2xl lg:text-3xl">별점 등록하기</label>
      <ReviewRating onRatingChange={handleRatingChange} />
      <form className="p-4 m-4 flex flex-col items-center">
        <div className="w-[25lvh] h-[25lvh] text-center padding-1 relative cursor-pointer border-2 border-dashed mb-5 mx-auto">
          <img src="/src/assets/pictures/upload.jpg" alt="upload" />
          <h3>사진을 업로드하세요</h3>
          <input
            id="uploadInput"
            type="file"
            className="w-[25lvh] h-[25lvh] cursor-pointer opacity-0 absolute inset-0 z-10"
            onChange={handleImageChange}
          />
        </div>
        <label className={labelClass}>등록한 사진</label>
        <div
          ref={handleRef}
          className="flex rounded-lg overflow-x-auto my-5 no-scroll w-full h-[28lvh] border-2 border-primary bg-slate-100"
        >
          {reviewImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="Uploaded"
              className="w-[25lvh] h-[25lvh] object-cover m-2 border-[1px] border-slate-400 p-2"
            />
          ))}
        </div>
        <label className={labelClass}>리뷰 작성하기</label>
        <textarea
          className="my-5 w-full h-48 outline-none border-2 border-primary focus:border-2 rounded-lg p-5 bg-slate-100"
          ref={reviewContentRef}
          placeholder="리뷰를 작성하세요"
          onBlur={handleBlur}
        />
        <label className={labelClass}>태그 추가</label>
        <p className="whitespace-pre-wrap">
          입력한 태그 나열, 누르면 태그 입력받을 + 동그라미 태그 정해지면
          추가해야 함
        </p>

        <Button
          label="업로드"
          onClick={writeReviewData}
          addClass="mx-auto"
        ></Button>
      </form>
    </div>
  );
}
