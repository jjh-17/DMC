import HomeIcon from "../../assets/icons/home.svg?react";
import BookMarkIcon from "../../assets/icons/bookmark.svg?react";
import ProfileIcon from "../../assets/icons/profile.svg?react";
import SearchIcon from '../../assets/icons/search.svg?react';
import LoginIcon from '../../assets/icons/login.svg?react';
import MyPageIcon from '../../assets/icons/mypage.svg?react';
import CoffeeIcon from '../../assets/icons/empty-coffee-bean.svg?react'
import LogoutIcon from '../../assets/icons/logout.svg?react';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useLoginUserStore } from '../../stores/userStore';
import Swal from "sweetalert2";

export default function TheFooter() {
  const navigate = useNavigate();
  const store = useLoginUserStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    setIsLogin(store.loginUser !== null);
  }, [store.loginUser])

  const footerStyle = "fixed w-full md:w-[60lvw] mx-auto  bg-white inset-x-0 bottom-0 text-center flex flex-row justify-around z-10 bg-zinc-50";
  const footerButtonStyle = "inline-block m-2 p-1 flex flex-col items-center hover:mb-2 hover:-mt-0 hover:text-primary duration-300 hover:border-b-2 hover:border-primary";
  const labelStyle = "text-sm font-light";
  const dropdownStyle = "fixed bg-white md:right-[20lvw] h-[84px] bottom-[76px] w-fit min-w-[20lvw] whitespace-no-wrap right-0 flex flex-row justify-around z-10 ";

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
      {!isLogin && (
        <button className={footerButtonStyle} onClick={() => navigate('/login')}>
          <LoginIcon id='svgIcon2' />
          <label className={labelStyle}>로그인</label>
        </button>
      )}
      {isLogin && (
        <div className="relative inline-block">
          <button
            className={footerButtonStyle}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <ProfileIcon id='svgIcon2' />
            <label className={labelStyle}>마이페이지</label>
          </button>
          {showDropdown && (
            <div className={dropdownStyle}>
              <button className={footerButtonStyle} onClick={() => {
                navigate('/');
                store.logout();
                Swal.fire({
                  title: "성공적으로 로그아웃 했습니다.",
                  icon: "success",
                })
              }}>
                <LogoutIcon id='svgIcon2' />
                <label className={labelStyle}>로그아웃</label>
              </button>
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
      )}

    </div>
  );
}
