import DetailCafeCard from "../../components/cafe/DetailCafeCard";
import SimpleCafeCard from "../../components/cafe/SimpleCafeCard";
import { useDragScroll } from "../../utils/useDragScroll";
import { useNavigate } from "react-router-dom";

const CafeListPage = () => {
  const navigate = useNavigate();

  const cafeDummyData = [
    {
      cafeSeq: 1,
      name: "식빵카페",
      distance: "555",
      address: "서울 종로구 새문안로 85",
      tag: ["#테이크아웃", "#분위기", "#가성비"],
      isOpen: true, // 영업 중 여부
      dessertTag: ["#마카롱", "#매커롱", "#맥커롱"],
      imageUrl: "src/assets/testpic/1.jpg",
    },
    {
      cafeSeq: 2,
      name: "시빵카페",
      distance: "666",
      address: "서울 종로구",
      tag: ["#테이크아웃", "#분위기", "#가성비"],
      isOpen: true, // 영업 중 여부
      dessertTag: ["#마카롱", "#브라우니", "#맥커롱"],
      imageUrl: "src/assets/testpic/2.jpg",
    },
    {
      cafeSeq: 3,
      name: "시방카페",
      distance: "555",
      address: "서울 종로구 새문안로 85",
      tag: ["#테이크아웃", "#분위기", "#가성비"],
      isOpen: true, // 영업 중 여부
      dessertTag: ["#브라우니"],
      imageUrl: "src/assets/testpic/3.jpg",
    },
    {
      cafeSeq: 4,
      name: "씨빵카페",
      distance: "555",
      address: "서울 종로구 새문안로 85",
      tag: ["#테이크아웃", "#분위기", "#가성비"],
      isOpen: true, // 영업 중 여부
      dessertTag: ["#마카롱", "#매커롱", "#맥커롱"],
      imageUrl: "src/assets/testpic/4.jpg",
    },
    {
      cafeSeq: 5,
      name: "식빨빵페",
      distance: "555",
      address: "서울 종로구 새문안로 85",
      tag: ["#테이크아웃", "#분위기", "#가성비"],
      isOpen: true, // 영업 중 여부
      dessertTag: ["#마카롱", "#매커롱", "#맥커롱"], // 디저트 메뉴 뭐 파는지
      imageUrl: "src/assets/testpic/5.jpg",
    },
  ];

  const [ref] = useDragScroll();

  return (
    <>
      <div className="mx-auto">
        <div ref={ref} className="flex flex-row overflow-x-scroll no-scroll">
          {cafeDummyData.map((cafe) => (
            <div key={cafe.cafeSeq}>
              <SimpleCafeCard {...cafe} />
            </div>
          ))}
        </div>
      </div>
      <div className="w-fit mx-auto">
        <div className="flex flex-col">
          {cafeDummyData.map((cafe) => (
            <div className="cursor-pointer" key={cafe.cafeSeq} onClick = {() => navigate('/cafeDetailTest')}>
              <DetailCafeCard {...cafe}/>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CafeListPage;