import { useEffect, useState } from "react";
import PrevArrow from "../../assets/icons/prevarrow.svg?react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const TheHeader = () => {
  const [headerClass, setHeaderClass] = useState("");
  const [headerText, setHeaderText] = useState("당모카");
  const location = useLocation();

  const findText = (path:string) => {
    switch (path) {
      case '/':
        setHeaderText("");
        break;
      case '/bookmark':
        setHeaderText("내 북마크");
        break;
      case '/search':
        setHeaderText("카페 찾기");
        break;
      case '/mypage':
        setHeaderText("내 프로필");
        break;
      case '/myinfo':
        setHeaderText("정보 수정하기");
        break;
      case '/mycafe':
        setHeaderText("");
        break;
      default:
        setHeaderText("당모카");
        break;
    }
  }
  useEffect(() => {
    const path = location.pathname;
    findText(path);
    window.scrollTo(0,0);
  }, [location]);
  
  useEffect(() => {
    const handleScroll = () => {
      const limitHeight = 100;
      const newHeaderClass =
        window.scrollY > limitHeight
          ? "fixed top-3 w-full bg-transparent pointer-events-none opacity-0 duration-500"
          : "fixed top-3 w-full bg-transparent pointer-events-auto opacity-100 duration-500";
      setHeaderClass(newHeaderClass);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  

  const navigate = useNavigate();

  return (
    <header className={headerClass}>
      <button onClick={() => navigate(-1)} className="absolute left-2 top-1">
        <PrevArrow className="m-1 p-[2px] w-7 h-7" />
      </button>
      <h1 id="test" className="text-center mx-auto mt-2 text-3xl md:text-4xl">
        {headerText}
      </h1>
    </header>
  );
};

export default TheHeader;
