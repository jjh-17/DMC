// cafeCard를 누를 시 cafeSeq와 현재 위치를 보낸 후 받아오는 response
import CoffeeBeanIcon from '../../assets/icons/coffeebean.svg?react';
import BookMarkIcon from '../../assets/icons/bookmark.svg?react'
import PinIcon from '../../assets/icons/locationpin.svg?react'
import ClockIcon from '../../assets/icons/clock1.svg?react'
import HomePageIcon from '../../assets/icons/homepage.svg?react'
import Button from '../../components/common/Button';
import CafeMenuList from '../../components/cafe/CafeMenuList'
// import CafeMenuCard from '../../components/cafe/CafeMenuCard';

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
  const cafeAddress: string[] = testDetail.address.split(' ');
  const simpleAddress = cafeAddress[0] + ', ' + cafeAddress[1];

  const svgClass = 'w-6 h-6 inline-block mr-1';
  const textClass = 'font-light text-lg my-2'

  const bookmarkCafe = () => {
    console.log('bookmark')
  }

  const onClick = () => {
    // cafe id 전달
    // review detail 이동
  }

  return (
    <div className="mt-0">
      <img src={testDetail.imageUrl} className="opacity-80 h-[80lvh] w-screen object-cover -z-10" />
      <h1 className="absolute top-[75lvh] ml-4 text-3xl text-white">{testDetail.name}</h1>
      <p className="absolute top-[80lvh] ml-4 text-white font-light">{simpleAddress}</p>
      <p className="absolute top-[84lvh] right-0 ml-2 text-[4lvw] text-white font-light">#TAG</p>
      <div className='m-2 border-b-[1px] border-primary p-2'>
        <span className={textClass}>
          <CoffeeBeanIcon className={svgClass + ' fill-primary'} />
          {testDetail.rating}
          <BookMarkIcon className={svgClass + ' cursor-pointer mx-2 hover:fill-primary'} onClick={bookmarkCafe} />
          <a href={testDetail.homepageUrl} className='cursor-pointer' target="_blank">
            <HomePageIcon className={svgClass} />
          </a>
        </span>
        <div className={textClass}>
          <PinIcon className={svgClass} />
          {testDetail.address}
        </div>
        <div className={textClass + " mb-4"}>
          <ClockIcon className={svgClass} />
          {testDetail.openingHour}
        </div>
      </div>
        <CafeMenuList />
      <div className='text-center'>
        <Button label="리뷰 상세보기" onClick={onClick} />
      </div>
    </div>
  )
}
