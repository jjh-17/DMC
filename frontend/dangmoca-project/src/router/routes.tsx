import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/user/Login";
import MyPage from "../pages/mypage/MyPage";
import CafeTest from "../pages/user/CafeTest";
import ErrorPage from "../pages/ErrorPage";
import CafeList from "../pages/cafe/CafeList";
<<<<<<< HEAD
import MyReview from "../pages/mypage/MyReview";
=======
>>>>>>> cea3f51e823f556c11f2b53805d99559bb28cfaf

const routes = createBrowserRouter([
  {
    path: "/",
    // element: < />, // 헤더, 푸터 껍데기
    children: [
      { path: "/", element: <Main /> }, // 메인화면 (첫 화면)
      { path: "login", element: <Login /> },
<<<<<<< HEAD
      { path: "mypage", element: <MyPage /> },
      { path: "my-reviews", element: <MyReview /> },
      { path: "cafetest", element: <CafeTest /> },
      { path: "cafes", element: <CafeList />, children: [] },
=======
      { path: "members", element: <MyPage /> },
      { path: "cafetest", element: <CafeTest /> },
      { path: "cafes", element: <CafeList />, children:[] },
>>>>>>> cea3f51e823f556c11f2b53805d99559bb28cfaf
    ],
  },
  { path: "/*", element: <ErrorPage /> },
]);
export default routes;
