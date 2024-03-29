import SimpleCafeCard from "../../components/cafe/SimpleCafeCard";
import SimpleReviewCard from "../../components/review/SimpleReviewCard";
import Profile from "../../components/mypage/Profile";
import RightArrow from '../../assets/icons/rightarrow.svg?react'
import { UserInfo } from "../../types/datatype";

export default function MyPage() {
  const dummyUser: UserInfo = {
    memberSeq: 1,
    profileImageUrl: "src/assets/icons/dummyUserImg.png",
    nickname: "당모카",
    title: "행복한 커피원두",
    preferenceTag: ["조용한", "커피"],
    deleted: false,
    mileage: 1215,
    titleList: ["깐깐한 커피콩","행복한 커피원두","무덤덤한 커피열매", "리뷰의 첫걸음"]
  };

  const dummyCafe = {
    cafeSeq: 1,
    name: "식빵카페",
    distance: "555",
    address: "서울 종로구 새문안로 85",
    tag: ["#테이크아웃", "#분위기", "#가성비"],
    isOpen: true, // 영업 중 여부
    dessertTag: ["#마카롱", "#매커롱", "#맥커롱"],
    imageUrl: "src/assets/testpic/1.jpg",
  };

  const dummyReview = {
    reviewSeq: 0,
    memberSeq: 0,
    cafeSeq: 0,
    name: "카페 남부",
    image: [
      "src/assets/testpic/1.jpg",
      "src/assets/testpic/2.jpg",
      "src/assets/testpic/3.jpg",
      "src/assets/testpic/4.jpg",
      "src/assets/testpic/5.jpg",
    ],
    content: "매우매우 맛있어요. 다시는 가고 싶어요",
    tag: ["조용한"],
    rating: 4,
    createdDate: "2024-01-02",
  };

  const divClass = "min-w-[80%] m-10";
  const spanClass = "ml-[25lvw] transform -translate-x-[50%] text-3xl lg:text-4xl whitespace-nowrap text-center";
  const buttonClass = "ml-[10lvw] text-sm lg:text-base whitespace-nowrap"

  return (
    <div className="min-w-full mx-auto flex flex-col items-center gap-4">
      <Profile {...dummyUser} />
      <div className={divClass}>
        <div className="flex items-center">
          <span className={spanClass} id="test">북마크한 카페</span>
          <a href="/??" className={buttonClass} id="test">
            전체보기
            <RightArrow id="svgIcon" />
          </a>
        </div>
        <SimpleCafeCard {...dummyCafe} />
      </div>
      <div className={divClass}>
        <div className="flex items-center">
          <span className={spanClass} id="test">작성한 리뷰</span>
          <a href="/??" className={buttonClass} id="test">
            전체보기
            <RightArrow id="svgIcon" />
          </a>
        </div>
        <SimpleReviewCard {...dummyReview} />
      </div>
    </div>
  );
}
