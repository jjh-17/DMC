import DetailCafeCard from "../../components/cafe/DetailCafeCard"
import SimpleCafeCard from "../../components/cafe/SimpleCafeCard"

export default function CafeListPage() {
  const cafedummydata = [
    {
      "cafeSeq": 1,
      "name": "식빵카페",
      "distance": "555",
      "address": "서울 종로구 새문안로 85",
      "tag": ["#테이크아웃", "#분위기", "#가성비"],
      "isOpen": true, // 영업 중 여부
      "dessetTag": ["#마카롱", "#매커롱", "#맥커롱"],
      "imageUrl": "src/assets/test/1.jpg"
    },
    {
      "cafeSeq": 2,
      "name": "시빵카페",
      "distance": "666",
      "address": "서울 종로구",
      "tag": ["#테이크아웃", "#분위기", "#가성비"],
      "isOpen": true, // 영업 중 여부
      "dessetTag": ["#마카롱", "#브라우니", "#맥커롱"],
      "imageUrl": "src/assets/test/2.jpg"
    }, {
      "cafeSeq": 3,
      "name": "시방카페",
      "distance": "555",
      "address": "서울 종로구 새문안로 85",
      "tag": ["#테이크아웃", "#분위기", "#가성비"],
      "isOpen": true, // 영업 중 여부
      "dessetTag": ["#브라우니"],
      "imageUrl": "src/assets/test/3.jpg"
    },
    {
      "cafeSeq": 4,
      "name": "씨빵카페",
      "distance": "555",
      "address": "서울 종로구 새문안로 85",
      "tag": ["#테이크아웃", "#분위기", "#가성비"],
      "isOpen": true, // 영업 중 여부
      "dessetTag": ["#마카롱", "#매커롱", "#맥커롱"],
      "imageUrl": "src/assets/test/4.jpg"
    },
    {
      "cafeSeq": 5,
      "name": "식빨빵페",
      "distance": "555",
      "address": "서울 종로구 새문안로 85",
      "tag": ["#테이크아웃", "#분위기", "#가성비"],
      "isOpen": true, // 영업 중 여부
      "dessetTag": ["#마카롱", "#매커롱", "#맥커롱"], // 디저트 메뉴 뭐 파는지
      "imageUrl": "src/assets/test/5.jpg"
    },
  ]

  return (
    <>
      <div className="w-fit mx-auto">
        <div className="flex flex-row">
          {cafedummydata.map((cafe) => (
            <div key={cafe.cafeSeq}>
              <SimpleCafeCard img={cafe.imageUrl} name={cafe.name} address={cafe.address} />
            </div>
          ))}
        </div>
      </div>
      <div className="w-fit mx-auto">
        <div className="flex flex-col">
          {cafedummydata.map((cafe) => (
            <div key={cafe.cafeSeq}>
              <DetailCafeCard cafe={cafe} />
            </div>
          ))}
        </div>

      </div>
    </>
  )
}
