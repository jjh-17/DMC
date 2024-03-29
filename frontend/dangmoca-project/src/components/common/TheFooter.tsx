import { useState } from 'react';
import HomeIcon from "../../assets/icons/home.svg?react";
import BookMarkIcon from "../../assets/icons/bookmark.svg?react";
import ProfileIcon from "../../assets/icons/profile.svg?react";
import SearchIcon from '../../assets/icons/search.svg?react';
import { useNavigate } from "react-router-dom";
// import LoginIcon from '../../assets/icons/login.svg?react';
import MyPageIcon from '../../assets/icons/mypage.svg?react';
import CoffeeIcon from '../../assets/icons/empty-coffee-bean.svg?react'

export default function TheFooter() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const footerStyle = "fixed w-full bg-white inset-x-0 bottom-0 text-center flex flex-row justify-around z-10";
  const footerButtonStyle = "inline-block m-2 p-1 flex flex-col items-center hover:mb-2 hover:-mt-0 hover:text-primary duration-300 hover:border-b-2 hover:border-primary";
  const labelStyle = "text-sm font-light";
  const dropdownStyle = "fixed bg-white h-[84px] bottom-[76px] w-fit min-w-[20lvw] whitespace-no-wrap right-0 flex flex-row justify-around z-10 ";

  return (
    <div className={footerStyle}>
      <button className={footerButtonStyle} onClick={() => navigate('/')}>
        <HomeIcon id='svgIcon2' />
        <label className={labelStyle}>홈</label>
      </button>
      <button className={footerButtonStyle} onClick={() => navigate('/search')}>
        <SearchIcon id='svgIcon2' />
        <label className={labelStyle}>검색</label>
      </button>
      <button className={footerButtonStyle} onClick={() => navigate('/cafetest')}>
        <CoffeeIcon id='svgIcon2' />
        <label className={labelStyle}> 취향테스트</label>
      </button>
      {/* 로그인 안했으면 로그인  */}
      {/* <button className={footerButtonStyle} onClick={() => navigate('/login')}>
        <LoginIcon id='svgIcon2' />
        <label className={labelStyle}>로그인</label>
      </button> */}
      <div className="relative inline-block">
        <button
          className={footerButtonStyle}
          onClick={() => setShowDropdown(!showDropdown)}
        // onBlur={() => setShowDropdown(false)}
        >
          <ProfileIcon id='svgIcon2' />
          <label className={labelStyle}>마이페이지</label>
        </button>
        {showDropdown && (
          <div className={dropdownStyle}>

            <button className={footerButtonStyle} onClick={() => navigate('/mypage')}>
              <MyPageIcon id='svgIcon2' />
              <label className={labelStyle}>프로필</label>
            </button>
            <button className={footerButtonStyle} onClick={() => navigate('/bookmark')}>
              <BookMarkIcon id='svgIcon2' />
              <label className={labelStyle}>내 북마크</label>
            </button>
            {/* <button onClick={() => navigate('/profile')} className={dropdownMenuStyle}>마이페이지</button>
            <button onClick={() => navigate('/login')} className={dropdownMenuStyle}>로그인</button>
            <button onClick={() => navigate('/cafeTest')} className={dropdownMenuStyle}>취향테스트</button> */}
          </div>
        )}
      </div>
    </div>
  );
}
