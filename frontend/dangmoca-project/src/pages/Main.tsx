import Button from "../components/common/Button"
import InfoDiv from "../components/main/InfoDiv";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoginUserStore } from "../stores/userStore";

export default function MainPage() {

  const navigate = useNavigate();
  const store = useLoginUserStore();
  // 로그인 가정 조건부 렌더
  const [isLogin, setIsLogin] = useState(false); 
  
  useEffect(() => {
    console.log(store.loginUser)
    setIsLogin(store.loginUser !== null);
  }, [])

  const handleClick = () => {
    if (!isLogin) navigate('/login')
    else navigate('/myCafe')
  };

  return (
    <>
      <div
        className="mx-auto flex flex-col items-center text-center w-full min-w-[40lvw] relative mt-[5lvh]"
      >
        <span id="test" className="text-xl lg:text-2xl whitespace-nowrap mb-2"> 당신의 모든 카페 </span>
        <h1 id="test" className="text-6xl lg:text-8xl whitespace-pre-wrap text-primary2 mb-4 lg:mb-0">DANGMOCA</h1>
        <video className="h-[90lvw] w-[90lvw] md:h-[40lvw] md:w-[40lvw] lg:h-[30lvw] lg:w-[30lvw] mt-0 rounded-full object-cover p-6 pointer-events-none" autoPlay muted loop>
          <source src="/src/assets/videos/coffee.mp4" type="video/mp4"/>
        </video>
        <Button label={!isLogin? "시작하기" : "내 카페 찾기"} onClick={handleClick} addClass="whitespace-nowrap lg:text-2xl lg:p-4 lg:mt-0 lg:mb-10 lg:rounded-2xl" />
      </div>
      <InfoDiv imgUrl="" imgAlt="실제카페추천화면" title="카페를 추천받으세요" description="ㅂㅂㅂ" />
      <InfoDiv imgUrl="" imgAlt="실제카페북마크화면" title="당신의 카페를 북마크하세요" description="ㅂㅂㅂ" />
      <InfoDiv imgUrl="" imgAlt="실제리뷰리스트화면" title="다른 사람의 리뷰 확인" description="ㅂㅂㅂ" />
    </>
  )
}
