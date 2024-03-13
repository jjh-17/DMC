import { Outlet } from "react-router-dom";
import TheFooter from "../components/common/TheFooter";

export default function RootLayout() {
  return (
    <>
      <Outlet />
      <TheFooter />
    </>
  );
}
