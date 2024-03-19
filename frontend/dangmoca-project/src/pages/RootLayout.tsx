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
    <div className="w-full h-full min-h-screen lg:bg-primary">
      {showHeader && <TheHeader textHeader={"당모카"}/>}      
      <div className="mt-12 mx-auto mb-20 bg-white lg:max-w-[70lvw] min-h-screen"> {/* header, footer 길이만큼 margin */}
        <Outlet />
      </div>
      <TheFooter />
    </div>
  );
}
