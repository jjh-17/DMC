import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import TheHeader from "../components/common/TheHeader";
import TheFooter from "../components/common/TheFooter";

export default function RootLayout() {
  const [showHeader, setShowHeader] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/login') {
      setShowHeader(false);
    } else{
      setShowHeader(true);
    }
  }, [location]);

  return (
    <div className="bg-[#3e2c1e]">
      {showHeader && <TheHeader />}
      <div className="mb-20 bg-white md:w-[60lvw] h-full min-h-screen pt-10 mx-auto"> {/* header, footer 길이만큼 margin */}
        <Outlet />
      </div>
      <TheFooter />
    </div>
  );
}
