import Button from "../components/common/Button"
import InfoDiv from "../components/main/InfoDiv";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function MainPage() {

  const navigate = useNavigate();
  // 로그인 가정 조건부 렌더
  const [isLogin, setIsLogin] = useState(false); 
  

  const handleClick = () => {
    if (!isLogin) navigate('/login')
    else navigate('/myCafe')
  };

  return (
    <>
      <div
        className="mx-auto flex flex-col items-center text-center w-full min-w-[40lvw] min-h-[80lvh] relative mt-[5lvh]"
      >
        <h1 id="test" className="text-6xl lg:text-7xl whitespace-pre-wrap text-primary2 mt-16 lg:mt-0">DANGMOCA</h1>
        <span id="test" className="text-xl lg:text-2xl whitespace-nowrap mb-5 lg:mb-0"> 당신의 모든 카페 </span>
        <video className="h-[100lvw] w-[100lvw] md:h-[40lvw] md:w-[40lvw] lg:h-[30lvw] lg:w-[30lvw] mt-0 rounded-full object-cover p-6 lg:p-10 pointer-events-none" autoPlay muted loop>
          <source src="/src/assets/videos/coffee.mp4" type="video/mp4"/>
        </video>
        <Button label={!isLogin? "시작하기" : "내 카페 찾기"} onClick={handleClick} addClass="whitespace-nowrap lg:text-2xl mt-10 lg:p-4 lg:mt-0 lg:mb-10 lg:rounded-2xl" />
        <button onClick={() => setIsLogin(!isLogin)}>로그인상태테스트</button>
      </div>
      <InfoDiv imgUrl="" imgAlt="실제카페추천화면" title="카페를 추천받으세요" description="ㅂㅂㅂ" />
      <InfoDiv imgUrl="" imgAlt="실제카페북마크화면" title="당신의 카페를 북마크하세요" description="ㅂㅂㅂ" />
      <InfoDiv imgUrl="" imgAlt="실제리뷰리스트화면" title="다른 사람의 리뷰 확인" description="ㅂㅂㅂ" />

    </>
  )
}
