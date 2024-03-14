import HomeIcon from "../../assets/icons/home.svg?react";
import BookMarkIcon from "../../assets/icons/bookmark.svg?react";
import ProfileIcon from "../../assets/icons/profile.svg?react";
import SearchIcon from '../../assets/icons/search.svg?react';
import { useNavigate } from "react-router-dom";

export default function TheFooter() {
  const navigate = useNavigate();
  const footerStyle = "fixed bg-white inset-x-0 bottom-0 border-t-primary border-t-2 text-center flex flex-row justify-around";
  const footerButtonStyle = "<m-1></m-1> p-1";
  const svgStyle = "w-8 h-8 p-1 m-1 hover:mb-3 hover:-mt-3 hover:fill-primary hover:mt-0 duration-300 hover:border-b-2 hover:border-primary";

  return (
    <div className={footerStyle}>
      <button className={footerButtonStyle} onClick={() => navigate('/')}>
        <HomeIcon className={svgStyle} />
      </button>
      <button className={footerButtonStyle}>
        <SearchIcon className={svgStyle} onClick={() => navigate('/cafes')} />
      </button>
      <button className={footerButtonStyle}>
        <BookMarkIcon className={svgStyle} onClick={() => navigate('/bookmark')} />
      </button>
      <button className={footerButtonStyle} onClick={() => navigate('/mypage')}>
        <ProfileIcon className={svgStyle} />
      </button>
    </div>
  );
}
