import SimpleCafeCard from "../../components/cafe/SimpleCafeCard";
import SimpleReviewCard from "../../components/cafe/SimpleReviewCard";
import Profile from "../../components/mypage/Profile";

export default function MyPage() {
  const dummyUser = {
    memberSeq: 1,
    profileImage: "src/assets/icons/dummyUserImg.png",
    nicName: "DMC",
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
    imageUrl: "src/assets/test/1.jpg",
  };

  const dummyReview = {
    reviewSeq: 0,
    memberSeq: 0,
    cafeSeq: 0,
    name: "카페 남부",
    image: [
      "src/assets/pictures/naver_map.png",
      "src/assets/pictures/naver_map.png",
      "src/assets/pictures/naver_map.png",
      "src/assets/pictures/naver_map.png",
      "src/assets/pictures/naver_map.png",
    ],
    content: "맛잇엇요",
    tag: ["조용한"],
    rating: 4,
    createdDate: "2024-01-02",
  };
  return (
    <>
      <Profile {...dummyUser} />
      <SimpleCafeCard {...dummyCafe} />
      <SimpleReviewCard {...dummyReview} />
    </>
  );
}
