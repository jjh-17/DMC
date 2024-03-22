import Button from "../components/common/Button"
import InfoDiv from "../components/main/InfoDiv";
import { useNavigate } from "react-router-dom";

export default function MainPage() {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login')
  };

  return (
    <>
      <div
        className="mx-auto flex flex-col items-center text-center w-full min-w-[40lvw] min-h-screen relative mt-[5lvh]"
      >
        <h1 id="test" className="text-5xl lg:text-8xl font-bold  whitespace-pre-wrap text-primary2">DANGMOCA</h1>
        <span id="test" className="text-xl lg:text-2xl whitespace-nowrap font-light m-0"> 당신의 모든 카페 </span>
        <video className="h-[90lvw] w-[90lvw] md:h-[40lvw] md:w-[40lvw] lg:h-[30lvw] lg:w-[30lvw] mt-0 lg:mt-10 rounded-full object-cover p-10 pointer-events-none" controls autoPlay muted loop>
          <source src="/src/assets/videos/coffee.mp4" type="video/mp4" />
        </video>
        <Button label="시작하기" onClick={handleClick} addClass="whitespace-nowrap lg:text-3xl lg:p-4 lg:mb-20 lg:rounded-2xl" />
      </div>
      <InfoDiv imgUrl="" imgAlt="카페추천화면" title="카페를 추천받으세요" description="ㅂㅂㅂ" />
      <InfoDiv imgUrl="" imgAlt="카페북마크화면" title="당신의 카페를 북마크하세요" description="ㅂㅂㅂ" />
      <InfoDiv imgUrl="" imgAlt="리뷰리스트화면" title="다른 사람의 리뷰 확인" description="ㅂㅂㅂ" />

    </>
  )
}
