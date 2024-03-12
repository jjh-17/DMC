import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/user/LoginPage";
import MyPage from "../pages/mypage/MyPage";
import CafeTestPage from "../pages/user/CafeTestPage";
import ErrorPage from "../pages/ErrorPage";
import CafeListPage from "../pages/cafe/CafeListPage";

const routes = createBrowserRouter([
  {
    path: "/",
    // element: < />, // 헤더, 푸터 껍데기
    children: [
      { path: "/", element: <MainPage /> }, // 메인화면 (첫 화면)
      { path: "login", element: <LoginPage /> },
      { path: "members", element: <MyPage /> },
      { path: "cafetest", element: <CafeTestPage /> },
      { path: "cafes", element: <CafeListPage />, children:[] },
    ],
  },
  { path: "/*", element: <ErrorPage /> },
]);
export default routes;
