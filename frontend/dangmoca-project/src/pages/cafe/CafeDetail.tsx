// cafeCard를 누를 시 cafeSeq와 현재 위치를 보낸 후 받아오는 response
interface CafeDetail {
  cafeSeq: number;
  name: string;
  distance: string;
  address: string;
  tag: string[];
  imageUrl: string;
  homepageUrl: string;
  rating: number;
  isBookmarked: boolean;
  updatedDate: string,
  openingHour: string,
}

const testDetail: CafeDetail = {
  cafeSeq: 1,
  name: '바나프레소 테헤란로점',
  distance: '100m',
  address: '서울 강남구 역삼동',
  tag: ['가성비', '테이크아웃', ''],
  imageUrl: 'src/assets/testpic/bana.jpg',
  homepageUrl: 'https://www.banapresso.com/',
  rating: 3.7,
  isBookmarked: false,
  updatedDate: '2024-03-14',
  openingHour: '월~금 07:00~20:00',
};

// export default function CafeDetailPage(cafeDetail: CafeDetail) {
export default function CafeDetailPage() {
  return (
    <div className="mt-0 ">
      <img src={testDetail.imageUrl} className="opacity-80 h-[80lvh] w-screen object-cover -z-10" />
      <h1 className="-mt-8 ml-2 text-2xl text-white z-20 ">{testDetail.name}</h1>
      <p>{testDetail.address}</p>
    </div>
  )
}
