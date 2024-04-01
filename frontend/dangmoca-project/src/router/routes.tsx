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
import CafeDetail from "../pages/cafe/CafeDetail";
import CafeSearch from "../pages/cafe/CafeSearch";
import ReviewWrite from "../pages/review/ReviewWrite";
import CafeReview from "../pages/review/CafeReview";
import NaverRedirectHandler from "../pages/user/NaverRedirectHandler";
import KakaoRedirectHandler from "../pages/user/KakaoRedirectHandler";
import CafeRecommend from "../pages/cafe/CafeRecommend";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // 헤더, 푸터 틀
    children: [
      { path: "/", element: <Main /> }, // 메인화면 (첫 화면)
      { path: "login", element: <Login /> },
      { path: "kakaoLogin", element: <KakaoRedirectHandler /> },
      { path: "naverLogin", element: <NaverRedirectHandler /> },
      { path: "mypage", element: <MyPage /> },
      { path: "myinfo", element: <MyInfo /> },
      { path: "myreview", element: <MyReview /> },
      { path: "bookmark", element: <Bookmark /> },
      { path: "cafetest", element: <CafeTest /> },
      { path: "search", element: <CafeSearch /> },
      {
        path: "cafedetail/*",
        element: <CafeDetail />,
        children: [
          {
            path: "review",
            element: <CafeReview />,
          },
          {
            path: "write",
            element: <ReviewWrite />,
          },
        ],
      },
      { path: "cafes/*", element: <CafeList />, children: [] },
      { path: "writereview", element: <ReviewWrite /> },
      { path: "mycafe", element: <CafeRecommend /> },
      { path: "/*", element: <ErrorPage /> },
    ],
  },
]);
export default routes;
