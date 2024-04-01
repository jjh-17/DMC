import CoffeeBeanIcon from "../../assets/icons/coffeebean.svg?react";
import BookMarkIcon from "../../assets/icons/bookmark.svg?react";
import PinIcon from "../../assets/icons/locationpin.svg?react";
import ClockIcon from "../../assets/icons/clock1.svg?react";
import HomePageIcon from "../../assets/icons/homepage.svg?react";
import Button from "../../components/common/Button";
import CafeMenuList from "../../components/cafe/CafeMenuList";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { CafeDetail } from "../../types/datatype";
import KakaoMap from '../../components/cafe/KakaoMap';
import useCafeStore from '../../stores/cafeStore';
import { cafeAPI } from "../../api/cafe";
import { useEffect, useState } from "react";
import ScrollToTop from "../../components/common/ScrollToTop";

const CafeDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isReviewPage, setIsReviewPage] = useState(false);
  const [isWritePage, setIsWritePage] = useState(false);

  useEffect(() => {
    setIsReviewPage(location.pathname.includes("/review"));
    setIsWritePage(location.pathname.includes("/write"));
  }, [location])

  const store = useCafeStore();
  const cafeSeq = store.selectedCafeSeq;

  const [cafeDetail, setCafeDetail] = useState<CafeDetail>({
    cafeSeq: 0,
    address: "",
    distance: "",
    homepageUrl: "",
    imageUrl: "",
    bookmarked: false,
    name: "",
    openingHour: "",
    rating: 0,
    tag: ["default1", "d2", "d3"],
    updatedDate: "",
  });

  const getCafeDetail = async () => {
    try {
      const response = await cafeAPI.getCafeDetail(cafeSeq);
      if (response.data.result?.address)
        setCafeDetail(response.data.result);
    }
    catch (error) {
      console.log(error)
    }
  }
  const [cafeMenuList, setCafeMenuList] = useState([]);

  const getCafeMenu = async () => {
    try {
      const response = await cafeAPI.getCafeMenu(cafeSeq);
      if (response.data.result.length > 0) setCafeMenuList(response.data.result);
      console.log(response);
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCafeDetail();
    getCafeMenu();
  }, []);

  const [showKakaoMap, setShowKakaoMap] = useState(false);

  const cafeAddress: string[] = cafeDetail.address != null ? cafeDetail.address.split(" ") : ["", ""];
  const simpleAddress = cafeAddress[0] + ", " + cafeAddress[1];
  const svgClass = "w-6 h-6 inline-block mr-1";
  const textClass = "font-light text-lg my-2 mx-4";

  const bookmarkCafe = async () => {
    try {
      if (cafeDetail.bookmarked) {
        await cafeAPI.deleteBookmark(cafeSeq);
      } else {
        await cafeAPI.doBookmark(cafeSeq);
      }
      setCafeDetail(prevCafeDetail => ({
        ...prevCafeDetail,
        bookmarked: !prevCafeDetail.bookmarked
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-5 mb-20">
      <img
        src={cafeDetail.imageUrl}
        className="opacity-80 h-[80lvh] w-screen object-cover -z-10"
      />
      <div className="absolute top-[65lvh] max-h-[30lvh] w-screen md:w-[60lvw] lg:w-[40lvw] ml-10 text-white bg-slate-50 bg-opacity-20">
        <h1 className="text-4xl md:text-5xl mb-2">
          {cafeDetail.name}
        </h1>
        <p className="text-xl md:text-2xl font-light">
          {simpleAddress}
        </p>
      </div>
      {!isReviewPage && !isWritePage && (
        <>
          {Array.isArray(cafeDetail.tag) && cafeDetail.tag.length > 0 && cafeDetail.tag.map((text: string, idx: number) => (
            <span
              key={idx}
              className="ml-2 my-2 text-base whitespace-nowrap underline"
            >
              #{text}{" "}
            </span>
          ))}
          <div className="border-b-[1px] border-primary pb-2 mx-2 my-2 lg:mx-10">
            <span className={textClass}>
              <CoffeeBeanIcon className={svgClass + " fill-primary"} />
              {(Math.round(cafeDetail.rating * 100) / 100).toFixed(2)}
              <BookMarkIcon
                className={svgClass + " cursor-pointer mx-2 " + (cafeDetail.bookmarked ? " fill-primary" : "")}
                onClick={bookmarkCafe}
              />
              <a
                href={cafeDetail.homepageUrl}
                className="cursor-pointer"
                target="_blank"
              >
                <HomePageIcon className={svgClass} />
              </a>
            </span>
            <div className={textClass}>
              <PinIcon className={svgClass} />
              {cafeDetail.address}
            </div>
            <div className={textClass + " mb-4"}>
              <ClockIcon className={svgClass} />
              {cafeDetail.openingHour}
            </div>
            {cafeDetail.address.length > 0 && !showKakaoMap && <button className="ml-10" onClick={() => setShowKakaoMap(!showKakaoMap)}>위치 보기 </button>
            }
            {
              showKakaoMap && <KakaoMap address={cafeDetail.address} name={cafeDetail.name} />
            }
          </div>
          {
            CafeMenuList.length > 1 &&
            <CafeMenuList cafeMenu={cafeMenuList} />
          }

          <div className="text-center">
            <Button label="리뷰 보러가기" onClick={() => navigate("review")} />
          </div>
        </>
      )}
      {isReviewPage && (
        <>
          <Button
            addClass=" fixed right-8 bottom-20 md:mr-[5lvw] text-lg md:text-2xl"
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
