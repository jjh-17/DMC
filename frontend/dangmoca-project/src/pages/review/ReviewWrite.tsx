import { useRef, useState } from "react";
import Button from "../../components/common/Button";
import ReviewRating from "../../components/review/ReviewRating";

interface Image {
  id: number;
  url: string;
}

// TODO : 헤더명 리뷰 작성하기'
export default function ReviewWrite() {
  const cafe = {
    cafeSeq: 1,
    name: "식빵카페",
    distance: "555",
    address: "서울 종로구 새문안로 85",
    tag: ["#테이크아웃", "#분위기", "#가성비"],
    isOpen: true, // 영업 중 여부
    dessertTag: ["#마카롱", "#매커롱", "#맥커롱"],
    imageUrl: "src/assets/testpic/1.jpg",
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

  return (
    <div className="flex flex-col w-fit gap-4">
      <img src='src/assets/testpic/bana.jpg' className="opacity-40 h-[40lvh] w-screen object-cover" />
      <p className="absolute top-[32lvh] ">리뷰 작성하기</p>
      <p className="absolute text-2xl top-[40lvh] ">{cafe.name}</p>
      <form className="p-4 m-4">
        <div className="w-[30lvh] h-[30lvh] text-center padding-1 relative cursor-pointer border-2 border-dashed mx-auto mb-10">
          <img src='src/assets/pictures/upload.jpg' alt="upload" />
          <h3 className="">사진을 업로드하세요</h3>
          <input
            id="uploadInput"
            type="file"
            className="h-[30lvh] w-[30lvh] cursor-pointer opacity-0 absolute inset-0 z-10"
            onChange={handleImageChange}
          />
        </div>
        <label className="font-light">등록한 사진</label>
        <div className="flex overflow-x-auto my-2 no-scroll px-3 py-4 w-full">
          {reviewImages.map((image) => (
            <img key={image.id} src={image.url} alt="Uploaded" className="w-[15lvh] h-[15lvh] object-cover m-2 border-[1px] border-primary3 p-2" />
          ))}
        </div>
        <p>리뷰</p>
        <textarea
          className="w-full h-48 border-2 border-gray-300 rounded-lg p-2"
          ref={reviewContentRef}
          placeholder="리뷰를 작성해 주십시오."
        />
        <p>태그</p>
        <div>
          입력한 태그 나열, 누르면 태그 입력받을 + 동그라미 <br />
          태그 정해지면 추가해야 함
        </div>
        <div>
          <ReviewRating />
        </div>
        <Button label="업로드" onClick={handleClick} addClass="mx-auto"></Button>
      </form>
    </div>
  );
};
