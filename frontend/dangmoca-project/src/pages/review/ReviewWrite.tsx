import { useRef, useState } from "react";
import Button from "../../components/common/Button";
import ReviewRating from "../../components/review/ReviewRating";

interface Image {
  id: number;
  url: string;
}

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
    <div className="flex flex-col items-start w-full max-w-4xl mx-auto p-4 space-y-4">
      <p className="text-center w-full">{cafe.name}</p>
      <div className="mb-4">
        <input type="file" onChange={handleImageChange} />
      </div>
      <div className="flex space-x-4">
        {reviewImages.map((image) => (
          <img key={image.id} src={image.url} alt="Uploaded" className="w-24 h-24 object-cover" />
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
        입력한 태그 나열, 누르면 태그 입력받을 + 동그라미 <br/>
        태그 정해지면 추가해야 함
      </div>
      <div>
        <ReviewRating/>
      </div>
      <Button label="업로드" onClick={handleClick} className="mx-auto"></Button>
    </div>
  );
};
