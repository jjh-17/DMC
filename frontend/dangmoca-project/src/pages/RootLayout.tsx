import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import TheHeader from "../components/common/TheHeader";
import TheFooter from "../components/common/TheFooter";

export default function RootLayout() {
  const [showHeader, setShowHeader] = useState(true);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="bg-primary">
      {showHeader && <TheHeader textHeader={"당모카"} />}
      <div className="mb-20 bg-white md:w-[60lvw] h-full min-h-screen pt-20 mx-auto"> {/* header, footer 길이만큼 margin */}
        <Outlet />
      </div>
      <TheFooter />
    </div>
  );
}
