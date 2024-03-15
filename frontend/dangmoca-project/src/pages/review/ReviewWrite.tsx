import { useRef } from "react";
import Button from "../../components/common/Button";

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

  const reviewContentRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    console.log("업로드");
  };

  return (
    <div className="flex flex-col items-start w-full max-w-4xl mx-auto p-4 space-y-4">
      <p className="text-left w-full">{cafe.name}</p>
      <div className="mx-auto">입력한 이미지 나열, 누르면 이미지 입력받을 + 동그라미</div>
      <p>리뷰</p>
      <input
        className="w-full border-2 border-gray-300 rounded-lg p-2"
        ref={reviewContentRef}
        placeholder="리뷰를 작성해 주십시오."
      />
      <p>태그</p>
      <div>
        입력한 태그 나열, 누르면 태그 입력받을 + 동그라미
      </div>
      <div>
        커피콩 모양 별점 기능. 5개 나열. 0.5점 단위
      </div>
      <Button label="업로드" onClick={handleClick} className="mx-auto"></Button>
    </div>
  );
};
