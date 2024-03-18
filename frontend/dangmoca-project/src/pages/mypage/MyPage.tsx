import SimpleCafeCard from "../../components/cafe/SimpleCafeCard";
import SimpleReviewCard from "../../components/review/SimpleReviewCard";
import Profile from "../../components/mypage/Profile";

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
  return (
    <div className="w-[60lvw] mx-auto flex flex-col items-center">
      <Profile {...dummyUser} />
      <hr className="w-full bg-primary size-[1px] m-2"/>
      북마크한 카페
      <SimpleCafeCard {...dummyCafe} />
      <hr className="w-full bg-primary size-[1px] m-2"/>
      내가 쓴 리뷰
      <SimpleReviewCard {...dummyReview} />
    </div>
  );
}
