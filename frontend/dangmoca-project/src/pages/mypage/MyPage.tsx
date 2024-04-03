import SimpleCafeCard from "../../components/cafe/SimpleCafeCard";
import SimpleReviewCard from "../../components/review/SimpleReviewCard";
import Profile from "../../components/mypage/Profile";
import RightArrow from "../../assets/icons/rightarrow.svg?react";
import { useLoginUserStore } from "../../stores/userStore";
import { memberAPI } from "../../api/memberAPI";
import { useEffect, useState } from "react";
import { reviewAPI } from "../../api/reviewAPI";
import { cafeAPI } from "../../api/cafe";
import { Review } from "../../types/datatype";
import { useDragScroll } from "../../utils/useDragScroll";
import ScrollToTop from "../../components/common/ScrollToTop";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import NotFound from "../../components/cafe/NotFound";

export default function MyPage() {
  const { loginUser, setLoginUser } = useLoginUserStore();
  const [myBookMarks, setMyBookMarks] = useState<object[]>([]);
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [showAllReviews, setShowAllReveiws] = useState(false);

  const navigate = useNavigate();

  const toggleReviewDisplay = () => {
    setShowAllReveiws(() => !showAllReviews);
  };

  const [setRef] = useDragScroll();

  const handleRef = (node: HTMLElement | null) => {
    if (node) {
      setRef(node);
    }
  };

  const getMyInfo = async () => {
    try {
      const response = await memberAPI.getMyInfo();
      setLoginUser(response.data.result);
      console.log(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  if (loginUser === null) {
    Swal.fire({
      title: "로그인 정보가 없습니다.",
      icon: "error",
      confirmButtonText: "돌아가기",
    }).then((response) => {
      if (response.isConfirmed) {
        navigate("/");
      }
    });
    return null;
  }

  const getMyBookMarks = async () => {
    try {
      const response = await cafeAPI.getBookmark(1);
      setMyBookMarks(response.data.result.list);
      console.log(response.data.result.list);
    } catch (error) {
      console.log(error);
    }
  };

  const firstNotDeletedReview = myReviews.find((review) => !review.deleted);

  const getMyReviews = async () => {
    try {
      // console.log(loginUser);
      const response = await reviewAPI.getMyReview(loginUser?.memberSeq);
      setMyReviews(response.data.result);
      console.log(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loginUser) {
      getMyInfo();
      getMyBookMarks();
      getMyReviews();
    }
  }, []);

  const divClass = "min-w-[80%] m-10";
  const spanClass =
    "text-3xl lg:text-4xl whitespace-nowrap text-center mt-10";
  const buttonClass = "ml-[10lvw] text-sm lg:text-base whitespace-nowrap";

  return (
    // <div className="min-w-full mx-auto flex flex-col items-center gap-4">
    <div className="m-15 mx-auto w-[80lvw] md:w-[40lvw] lg:w-[40lvw] flex flex-col items-center">
      <Profile {...loginUser} />
      <div className={divClass}>
        <div className="flex items-center">
          <span className={spanClass} id="test">
            북마크한 카페
          </span>
          <a href="/bookmark" className={buttonClass} id="test">
            전체보기
            <RightArrow id="svgIcon" />
          </a>
        </div>
      </div>
      {myBookMarks.length === 0 && (
        <NotFound
          maxHeight="h-[30vw]"
          margin="mt-10 mb-10"
          mainText="아직 카페를 북마크하지 않았어요."
          labelname="카페 찾으러 가기"
          handleOnClick={() => navigate("/search")}
        />
      )}
      <div className=" whitespace-nowrap">
        <div
          ref={handleRef}
          className="flex flex-row overflow-x-scroll no-scroll"
        >
          {myBookMarks?.map((myBookMark, index) => (
            <div key={index}>
              <SimpleCafeCard {...myBookMark} />
            </div>
          ))}
        </div>
      </div>
      <div className={divClass}>
        <div className="flex items-center">
          <span className={spanClass} id="test">
            작성한 리뷰
          </span>
          <button
            onClick={toggleReviewDisplay}
            className={buttonClass}
            id="test"
          >
            전체보기
            <RightArrow id="svgIcon" />
          </button>
        </div>
        {showAllReviews ? (
          <>
            {myReviews?.map((myReview, index) => (
              <div key={index}>
                <SimpleReviewCard {...myReview} refreshReviews={getMyReviews} />
              </div>
            ))}
            <ScrollToTop />
          </>
        ) : firstNotDeletedReview ? (
          <div>
            <SimpleReviewCard
              {...firstNotDeletedReview}
              refreshReviews={getMyReviews}
            />
          </div>
        ) : (
          <div className="mx-auto">
          <NotFound
            maxHeight="h-[30vw]"
            margin="mt-10 mb-10"
            mainText="아직 리뷰를 작성하지 않았어요."
            labelname="카페 찾으러 가기"
            handleOnClick={() => navigate("/search")}
          />
          </div>
        )}
      </div>
    </div>
  );
}
