import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TheHeader from "../components/common/TheHeader";
import TheFooter from "../components/common/TheFooter";

export default function RootLayout() {
  const [showHeader, setShowHeader] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const noRequireAuth = ["/", "/login", "/kakaoLogin", "/naverLogin"]

  useEffect(() => {
    if (location.pathname === '/login') {
      setShowHeader(false);
    } else{
      setShowHeader(true);
    }

    if (!noRequireAuth.includes(location.pathname)) {
      if (localStorage.getItem("user") != undefined) {
        navigate(-1);
        alert("로그인이 필요합니다");
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);



  return (
    <div className="bg-[#3e2c1e]">
      {showHeader && <TheHeader />}
      <div className="mb-[52px] bg-white md:w-[60lvw] h-full min-h-screen pt-10 mx-auto"> {/* header, footer 길이만큼 margin */}
        <Outlet />
      </div>
      <TheFooter />
    </div>
  );
}
