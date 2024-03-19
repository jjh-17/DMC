import SimpleCafeCard from "../../components/cafe/SimpleCafeCard";
import SimpleReviewCard from "../../components/review/SimpleReviewCard";
import Profile from "../../components/mypage/Profile";
import RightArrow from '../../assets/icons/rightarrow.svg?react'

export default function MyPage() {
  const dummyUser = {
    memberSeq: 1,
    profileImage: "src/assets/icons/dummyUserImg.png",
    nickName: "DMC",
    title: "커피에 미친 사람",
    tag: ["#조용한 카페", "#분위기 좋은 카페"]
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
    content: "맛잇엇요",
    tag: ["조용한"],
    rating: 4,
    createdDate: "2024-01-02",
  };

  const divClass = "border-t-2 border-primary min-w-full p-5";

  return (
    <div className="min-w-full mx-auto flex flex-col items-center gap-4">
      <Profile {...dummyUser} />
      <div className={divClass}>
        <div className="flex items-center">
          <span className="ml-[25lvw] text-3xl lg:text-4xl whitespace-nowrap" id="test">북마크한 카페</span>
          <a href="/??" className="ml-[10lvw] text-sm lg:text-base whitespace-nowrap" id="test">
            전체보기
            <RightArrow id="svgIcon" />
          </a>
        </div>
        <SimpleCafeCard {...dummyCafe} />
      </div>
      <div className={divClass}>
        <div className="flex items-center">
          <span className="ml-[25lvw] text-3xl lg:text-4xl whitespace-nowrap" id="test">작성한 리뷰</span>
          <a href="/??" className="ml-[10lvw] text-sm lg:text-base whitespace-nowrap" id="test">
            전체보기
            <RightArrow id="svgIcon" />
          </a>
        </div>
        <SimpleReviewCard {...dummyReview} />
      </div>
    </div>
  );
}
