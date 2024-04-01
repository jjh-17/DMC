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
    // 로그인 판단 로직
    console.log(store.loginUser)
    setIsLogin(store.loginUser !== null);
    if (localStorage.getItem("position") == undefined) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          localStorage.setItem("latitude", latitude.toString());
          localStorage.setItem("longitude", longitude.toString());
        })
      }
    }

  }, [])

  const handleClick = () => {
    if (!isLogin) navigate('/login')
    else navigate('/myCafe')
  };

  return (
    <>
      <div
        className="mx-auto flex flex-col items-center text-center w-full min-w-[40lvw] relative mt-[5lvh] mb-[10lvh]"
      >
        <span id="test" className="text-xl lg:text-2xl whitespace-nowrap mb-2"> 당신의 모든 카페 </span>
        <h1 id="test" className="text-6xl lg:text-8xl whitespace-pre-wrap text-primary2 mb-4 lg:mb-0">DANGMOCA</h1>
        <video className="h-[90lvw] w-[90lvw] md:h-[40lvw] md:w-[40lvw] lg:h-[30lvw] lg:w-[30lvw] mt-0 rounded-full object-cover p-6 pointer-events-none" autoPlay muted loop>
          <source src="/src/assets/videos/coffee.mp4" type="video/mp4" />
        </video>
        <InfoDiv title="카페를 추천받으세요" description="취향에 따른 카페 추천 해줌" />
        <InfoDiv title="카페를 찾아서 북마크하세요" description="이제 내까페임 ㅎ" />
        <InfoDiv title="리뷰 결과를 보고 판단하세요" description="카페 리뷰를 분석해서 결과 보여줌" />
        <Button label={!isLogin ? "시작하기" : "내 카페 찾기"} onClick={handleClick} addClass="whitespace-nowrap text-2xl lg:text-3xl lg:p-4 my-20 lg:rounded-2xl" />
      </div>
    </>
  )
}
