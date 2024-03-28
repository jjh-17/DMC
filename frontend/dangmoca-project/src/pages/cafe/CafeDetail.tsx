import CoffeeBeanIcon from "../../assets/icons/coffeebean.svg?react";
import BookMarkIcon from "../../assets/icons/bookmark.svg?react";
import PinIcon from "../../assets/icons/locationpin.svg?react";
import ClockIcon from "../../assets/icons/clock1.svg?react";
import HomePageIcon from "../../assets/icons/homepage.svg?react";
import Button from "../../components/common/Button";
import CafeMenuList from "../../components/cafe/CafeMenuList";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { CafeDetail } from "../../types/datatype";
// import BottomSheet from "../../components/review/BottomSheet";
import KakaoMap from "../../components/cafe/KakaoMap";
import ScrollToTop from "../../components/common/ScrollToTop";

const testDetail: CafeDetail = {
  cafeSeq: 1,
  name: "바나프레소 테헤란로점",
  distance: "100m",
  address: "서울 강남구 테헤란로 208 바나프레소",
  tag: ["가성비", "테이크아웃", "분위기"],
  imageUrl: "/src/assets/testPic/bana.jpg",
  homepageUrl: "https://www.banapresso.com/",
  rating: 3.7,
  isBookmarked: false,
  updatedDate: "2024-03-14",
  openingHour: "월~금 07:00~20:00",
};

const CafeDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isReviewPage = location.pathname.includes("/review");
  const isWritePage = location.pathname.includes("/write");

  // const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setViewportHeight(window.innerHeight);
  //   };

  //   window.addEventListener("resize", handleResize);

  //   // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  const cafeAddress: string[] = testDetail.address.split(" ");
  const simpleAddress = cafeAddress[0] + ", " + cafeAddress[1];

  const svgClass = "w-6 h-6 inline-block mr-1";
  const textClass = "font-light text-lg my-2 mx-4";

  const bookmarkCafe = () => {
    console.log("bookmark");
  };

  return (
    <div className="mt-0">
      <img
        src={testDetail.imageUrl}
        className="opacity-80 h-[80lvh] w-screen object-cover -z-10"
      />
      <h1 className="absolute top-[75lvh] ml-4 text-3xl text-white">
        {testDetail.name}
      </h1>
      <p className="absolute top-[80lvh] ml-4 text-white font-light">
        {simpleAddress}
      </p>
      {!isReviewPage && !isWritePage && (
        <>
          {testDetail.tag.map((text, idx) => (
            <span
              key={idx}
              className="relative ml-2 text-base text-white -top-[5lvh]  left-[35lvw] whitespace-nowrap underline"
            >
              #{text}{" "}
            </span>
          ))}
          <div className="border-b-[1px] border-primary pb-2 mx-2 lg:mx-10">
            <span className={textClass}>
              <CoffeeBeanIcon className={svgClass + " fill-primary"} />
              {testDetail.rating}
              <BookMarkIcon
                className={svgClass + " cursor-pointer mx-2 hover:fill-primary"}
                onClick={bookmarkCafe}
              />
              <a
                href={testDetail.homepageUrl}
                className="cursor-pointer"
                target="_blank"
              >
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
          <KakaoMap address={testDetail.address} name={testDetail.name} />
          <CafeMenuList />
          <div className="text-center">
            <Button label="리뷰 보러가기" onClick={() => navigate("review")} />
          </div>
        </>
      )}
      {isReviewPage && (
        <>
          <Button
            addClass="fixed right-0 bottom-0 mr-8 mb-20 md:mr-80"
            label="리뷰 작성하기"
            onClick={() => navigate("write")}
          />

          <ScrollToTop />
        </>
      )}
      <Outlet />
    </div>
  );
};

export default CafeDetailPage;
