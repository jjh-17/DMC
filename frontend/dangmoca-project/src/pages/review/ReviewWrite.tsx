import { useRef, useState } from "react";
import Button from "../../components/common/Button";
import ReviewRating from "../../components/review/ReviewRating";
import { useDragScroll } from "../../utils/useDragScroll";
import { reviewAPI } from "../../api/reviewAPI";

interface Image {
  id: number;
  url: string;
}

// TODO : 헤더명 리뷰 작성하기'
export default function ReviewWrite() {
  const [ref] = useDragScroll();

  const [review, setReview] = useState([{review1 :"맛있어요", review2:"행복해요"}]);

  const cafe = {
    cafeSeq: 1,
    name: "식빵카페",
    distance: "555",
    address: "서울 종로구 새문안로 85",
    tag: ["#테이크아웃", "#분위기", "#가성비"],
    isOpen: true, // 영업 중 여부
    dessertTag: ["#마카롱", "#매커롱", "#맥커롱"],
    imageUrl: "src/assets/testPic/1.jpg",
  };

  // 리뷰 별점 관련
  const handleRatingChange = (rating:number) => {
    setReview((prevReview) => ({
      ...prevReview,
      rating: rating,
    }));
  };

  // 리뷰 내용 관련
  const reviewContentRef = useRef<HTMLTextAreaElement>(null);

  const handleBlur = (event) => {
    // textarea의 현재 값을 content 상태에 저장
    setReview((prevReview) => ({
      ...prevReview,
      content: event.target.value,
    }));

    console.log("리뷰 내용 변경");
  };

  // 이미지 관련
  const [reviewImages, setReviewImages] = useState<Image[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const newImage: Image = {
          id: Date.now(), // 간단한 ID 생성
          url: reader.result as string,
        };
        setReviewImages([...reviewImages, newImage]);
      };

      reader.readAsDataURL(file);
    }

    setReview((prevReview) => ({
      ...prevReview,
      image: reviewImages,
    }));
  };

  // 태그 관련
  // const [tags, setTags] = useState<string[]>([]);

  // 리뷰 작성
  const writeReviewData = async () => {
    try {
      await reviewAPI.writeReview(cafe.cafeSeq, review);
    } catch (error) {
      console.error("리뷰 작성 에러: ", error);
    }
    console.log("업로드", review); // 백 연결 후 review 출력해보기
  };

  const labelClass = "lg:text-2xl";

  {
    /* <div className="flex flex-col w-fit gap-4 text-center"></div> */
  }

  return (
    <div className="min-w-screen max-w-[600px] flex flex-col gap-4 border-b-[1px] border-slate-500 mx-auto p-6">
      {/* <img
        src="src/assets/testpic/bana.jpg"
        className="opacity-40 h-[40lvh] w-screen object-cover"
      />
      <div className="absolute text-3xl lg:text-4xl top-[37lvh] left-[50lvw] -translate-x-[50%]">
        {cafe.name}
      </div> */}
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
          ref={ref}
          className="flex rounded-lg overflow-x-auto my-5 no-scroll w-full h-[28lvh] border-2 border-primary bg-slate-100"
        >
          {reviewImages.map((image) => (
            <img
              key={image.id}
              src={image.url}
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
