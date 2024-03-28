import { useEffect, useState } from "react";
import PrevArrow from "../../assets/icons/prevarrow.svg?react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const TheHeader = () => {
  const [headerClass, setHeaderClass] = useState("fixed top-3 w-full bg-transparent");
  const [headerText, setHeaderText] = useState("당모카");
  const location = useLocation();
  const history = window.history;

  const findText = (path:string) => {
    switch (path) {
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
      case '/myCafe':
        setHeaderText("내 추천 카페");
        break;
      default:
        setHeaderText("당모카");
        break;
    }
  }
  useEffect(() => {
    const path = location.pathname;
    findText(path);
  }, [location]);
  
  useEffect(() => {
    const handleScroll = () => {
      const limitHeight = 100;
      const newHeaderClass =
        window.scrollY > limitHeight
          ? "pointer-events-none opacity-0 duration-500"
          : "opacity-100 duration-500";
      setHeaderClass(prevClass => prevClass.includes(newHeaderClass) ? prevClass : prevClass + " " + newHeaderClass);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  

  const navigate = useNavigate();

  return (
    <header className={headerClass}>
      {history.length > 3 && (
        <button onClick={() => navigate(-1)} className="absolute left-2 top-1">
          <PrevArrow className="m-1 p-[2px] w-7 h-7" />
        </button>
      )}
      <h1 id="test" className="text-center mx-auto mt-2 text-3xl md:text-4xl">
        {headerText}
      </h1>
    </header>
  );
};

export default TheHeader;
