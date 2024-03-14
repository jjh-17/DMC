import HomeSvg from "../../assets/icons/homepage.svg";
import PinSvg from "../../assets/icons/pin.svg";
import BookMarkSvg from "../../assets/icons/bookmark.svg";
import ProfileSvg from "../../assets/icons/profile.svg";
import {useNavigate} from "react-router-dom";

export default function TheFooter() {
    const navigate = useNavigate();
  const footerButtonStyle = "mx-4 font-bold py-2 px-4 rounded";

  return (
    <div className="fixed inset-x-0 bottom-0 bg-white border-t-primary border-t-2 text-center shadow-lg p-2">
      <button className={footerButtonStyle} onClick={() => navigate('/')}>
        <img src={HomeSvg} alt="홈" />
      </button>
      <button className={footerButtonStyle}>
        <img src={PinSvg} alt="검색" />
      </button>
      <button className={footerButtonStyle}>
        <img src={BookMarkSvg} alt="북마크" onClick={() => navigate('/bookmark')}/>
      </button>
      <button className={footerButtonStyle} onClick={() => navigate('/mypage')}>
        <img src={ProfileSvg} alt="프로필" />
      </button>
    </div>
  );
}
