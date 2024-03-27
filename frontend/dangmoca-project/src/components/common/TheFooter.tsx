import HomeIcon from "../../assets/icons/home.svg?react";
import BookMarkIcon from "../../assets/icons/bookmark.svg?react";
import ProfileIcon from "../../assets/icons/profile.svg?react";
import SearchIcon from '../../assets/icons/search.svg?react';
import { useNavigate } from "react-router-dom";

export default function TheFooter() {
  const navigate = useNavigate();
  const footerStyle = "fixed w-full bg-white inset-x-0 bottom-0 text-center flex flex-row justify-around z-10";
  const footerButtonStyle = "inline-block m-2 p-1 flex flex-col items-center hover:mb-2 hover:-mt-0 hover:text-primary duration-300 hover:border-b-2 hover:border-primary";
  const labelStyle = "text-sm font-light"

  return (
    <div className={footerStyle}>
      <button className={footerButtonStyle} onClick={() => navigate('/')}>
        <HomeIcon id='svgIcon2' />
        <label className={labelStyle}>HOME</label>
      </button>
      <button className={footerButtonStyle} onClick={() => navigate('/search')}>
        <SearchIcon id='svgIcon2' />
        <label className={labelStyle}>SEARCH</label>
      </button>
      <button className={footerButtonStyle} onClick={() => navigate('/bookmark')}>
        <BookMarkIcon id='svgIcon2' />
        <label className={labelStyle}>BOOKMARK</label>
      </button>
      <button className={footerButtonStyle} onClick={() => navigate('/mypage')}>
        <ProfileIcon id='svgIcon2' />
        <label className={labelStyle}>PROFILE</label>
      </button>
    </div>
  );
}
