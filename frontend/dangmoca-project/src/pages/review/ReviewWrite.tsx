import { useRef, useState } from "react";
import Button from "../../components/common/Button";
import ReviewRating from "../../components/review/ReviewRating";
import { useDragScroll } from "../../utils/useDragScroll";

interface Image {
  id: number;
  url: string;
}

// TODO : 헤더명 리뷰 작성하기'
export default function ReviewWrite() {
  const [ref] = useDragScroll();

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

  const reviewContentRef = useRef<HTMLTextAreaElement>(null);

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
  };

  // 태그 관련
  const [tags, setTags] = useState<string[]>([]);

  const handleClick = () => {
    console.log("업로드");
  };

  const labelClass = "lg:text-2xl";

  return (
    <div className="flex flex-col w-fit gap-4 text-center">
      <img src='src/assets/testpic/bana.jpg' className="opacity-40 h-[40lvh] w-screen object-cover" />
      <div className="absolute text-3xl lg:text-4xl top-[37lvh] left-[50lvw] -translate-x-[50%]">{cafe.name}</div>
      <label className="text-center text-2xl lg:text-3xl">별점 등록하기</label>
      <ReviewRating />
      <form className="p-4 m-4">
        <div className="w-[25lvh] h-[25lvh] text-center padding-1 relative cursor-pointer border-2 border-dashed mb-5 mx-auto">
          <img src='src/assets/pictures/upload.jpg' alt="upload" />
          <h3>사진을 업로드하세요</h3>
          <input
            id="uploadInput"
            type="file"
            className="w-[25lvh] h-[25lvh] cursor-pointer opacity-0 absolute inset-0 z-10"
            onChange={handleImageChange}
          />
        </div>
        <label className={labelClass}>
          등록한 사진</label>
        <div
          ref={ref}
          className="flex rounded-lg overflow-x-auto my-5 no-scroll w-full h-[28lvh] border-2 border-primary bg-slate-100">
          {reviewImages.map((image) => (
            <img key={image.id} src={image.url} alt="Uploaded" className="w-[25lvh] h-[25lvh] object-cover m-2 border-[1px] border-slate-400 p-2" />
          ))}
        </div>
        <label className={labelClass}>
          리뷰 작성하기
        </label>
        <textarea
          className="my-5 w-full h-48 outline-none border-2 border-primary focus:border-2 rounded-lg p-5 bg-slate-100"
          ref={reviewContentRef}
          placeholder="리뷰를 작성하세요"
        />
        <label className={labelClass}>
          태그 추가
        </label>
        <p className="whitespace-pre-wrap">
          입력한 태그 나열, 누르면 태그 입력받을 + 동그라미
          태그 정해지면 추가해야 함
        </p>

        <Button label="업로드" onClick={handleClick} addClass="mx-auto"></Button>
      </form>
    </div>
  );
};
