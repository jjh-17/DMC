import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/user/Login";
import MyPage from "../pages/mypage/MyPage";
import CafeTest from "../pages/user/CafeTest";
import ErrorPage from "../pages/ErrorPage";
import CafeList from "../pages/cafe/CafeList";
import MyReview from "../pages/mypage/MyReview";
import RootLayout from "../pages/RootLayout";
import Bookmark from "../pages/mypage/Bookmark";
import MyInfo from "../pages/mypage/MyInfo";
import KakaoMain from "../pages/user/KakaoMain";
import CafeDetail from "../pages/cafe/CafeDetail";
import CafeSearch from "../pages/cafe/CafeSearch";
import ReviewWrite from "../pages/review/ReviewWrite";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // 헤더, 푸터 틀
    children: [
      { path: "/", element: <Main /> }, // 메인화면 (첫 화면)
      { path: "login", element: <Login /> },
      { path: "kakaoLogin", element: <KakaoMain /> },
      { path: "myPage", element: <MyPage /> },
      { path: "myInfo", element: <MyInfo /> },
      { path: "myReview", element: <MyReview /> },
      { path: "bookmark", element: <Bookmark /> },
      { path: "cafeTest", element: <CafeTest /> },
      {path: "search" , element: <CafeSearch />},
      { path: "cafeDetail/*", element: <CafeDetail />}, 
      { path: "cafes/*", element: <CafeList />, children: [] },
      { path: "my-reviews", element: <MyReview /> },
      { path: "review-write", element: <ReviewWrite /> },
    ],
  },
  { path: "/*", element: <ErrorPage /> },
]);
export default routes;
