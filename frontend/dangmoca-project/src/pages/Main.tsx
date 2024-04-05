import Button from "../components/common/Button"
import InfoDiv from "../components/main/InfoDiv";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoginUserStore } from "../stores/userStore";
import videoUrl from "../assets/videos/coffee.mp4";

export default function MainPage() {
  const navigate = useNavigate();
  const store = useLoginUserStore();
  // 로그인 가정 조건부 렌더
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // 로그인 판단 로직
    setIsLogin(store.loginUser !== null);
    if (localStorage.getItem("position") === null || localStorage.getItem("position") === undefined) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          let { latitude, longitude } = position.coords;
          // getLocation 위경도 부정확도 .. 를 개선
          if (Math.abs(latitude - 37.501271677039064) > 0.001) {
            latitude = 37.501271677039064;
          }
          if (Math.abs(longitude - 127.03960465624748) > 0.001) {
            longitude = 127.03960465624748;
          }

          localStorage.setItem("latitude", latitude.toString());
          localStorage.setItem("longitude", longitude.toString());
        })
      }
    }

  }, [store.loginUser])

  const handleClick = () => {
    if (!isLogin) navigate('/login')
    else navigate('/mycafe')
  };

  return (
    <>
      <div
        className="mx-auto flex flex-col items-center text-center w-full min-w-[40lvw] relative mt-[5lvh] pb-28"
      >
        <span id="test" className="text-xl lg:text-2xl whitespace-nowrap mb-2">당신의 모든 카페 </span>
        <h1 id="test" className="text-6xl lg:text-8xl whitespace-pre-wrap text-primary2 mb-4 lg:mb-0">DANGMOCA</h1>
        <video className="h-[90lvw] w-[90lvw] md:h-[40lvw] md:w-[40lvw] lg:h-[30lvw] lg:w-[30lvw] mt-0 rounded-full object-cover p-6 pointer-events-none" autoPlay muted loop>
          <source src={videoUrl} type="video/mp4" />
        </video>
        <Button label={!isLogin ? "로그인" : "내 카페 찾기"} onClick={handleClick} addClass="whitespace-nowrap text-3xl lg:p-4 mb-16 mt-10 lg:rounded-2xl p-4" />
        <InfoDiv title="카페를 추천받으세요" description={["취향테스트를 통해 내 취향을 검사하고 리뷰를 작성하세요.", "나에게 꼭 맞는 카페를 찾아 드립니다."]} delay={[0.3, 0.5, 0.5]} icon="cafe" />
        <InfoDiv title="리뷰 분석을 보고 판단하세요" description={["리뷰어와 리뷰 내용을 실시간으로 분석합니다.", "신뢰도와 긍정/부정 여부를 제공합니다."]} delay={[0.3, 0.5, 0.5]} icon="analysis" />
        <InfoDiv title="나만의 카페를 찾아서 모으세요" description={["좋아하는 카페를 북마크하고 리뷰를 작성하세요.", "북마크한 카페와 작성한 리뷰를 한번에 볼 수 있습니다."]} delay={[0.3, 0.5, 0.5]} icon="bookmark" />
      </div>
    </>
  )
}
