import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/user/Login";
import MyPage from "../pages/mypage/MyPage";
import CafeTest from "../pages/user/CafeTest";
import ErrorPage from "../pages/ErrorPage";
import CafeList from "../pages/cafe/CafeList";

const routes = createBrowserRouter([
  {
    path: "/",
    // element: < />, // 헤더, 푸터 껍데기
    children: [
      { path: "/", element: <Main /> }, // 메인화면 (첫 화면)
      { path: "login", element: <Login /> },
      { path: "members", element: <MyPage /> },
      { path: "cafetest", element: <CafeTest /> },
      { path: "cafes", element: <CafeList />, children:[] },
    ],
  },
  { path: "/*", element: <ErrorPage /> },
]);
export default routes;
