import { Outlet } from "react-router-dom";
import { useRef} from "react";
import TheHeader from "../components/common/TheHeader";
import TheFooter from "../components/common/TheFooter";

export default function RootLayout() {
  const showHeader = useRef(true);
  return (
    <>
      <TheHeader textHeader="당모카" showHeader={showHeader.current} />
      <div className="mt-12 mb-20"> {/* header, footer 길이만큼 margin */}
      <Outlet />
      </div>
      <TheFooter />
    </>
  );
}
