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
    <>
      {showHeader && <TheHeader textHeader={"당모카"}/>}      
      <div className="mt-12 mb-32"> {/* header, footer 길이만큼 margin */}
        <Outlet />
      </div>
      <TheFooter />
    </>
  );
}
