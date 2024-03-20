import Button from "../components/common/Button"
import { useNavigate } from "react-router-dom";
// import MainLogo1 from '../assets/icons/logo1.svg?react';
// import MainLogo2 from '../assets/icons/logo2.svg?react';
import DownArrowIcon from '../assets/icons/downarrow.svg?react';

export default function MainPage() {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login')
  };

  const infoDivClass = "bg-[#BAA89B] flex flex-row justify-around bg-opacity-30 h-[30lvh] min-w-[40lvw] mt-[5lvh] items-center text-center shadow-md"

  return (
    <>
      <div
        className="mx-auto flex flex-col items-center text-center w-full min-w-[40lvw] min-h-screen relative mt-[5lvh]"
      >
        <h1 id="test" className="text-5xl lg:text-8xl font-bold  whitespace-pre-wrap text-primary2">DANGMOCA</h1>
        <span id="test" className="text-xl lg:text-2xl whitespace-nowrap font-light m-0"> 당신의 모든 카페 </span>
        <video className="h-[100lvw] w-[100lvw] md:h-[40lvw] md:w-[40lvw] lg:h-[30lvw] lg:w-[30lvw] mt-0 lg:mt-10 rounded-full object-cover p-10 pointer-events-none" controls autoPlay muted loop>
          <source src="/src/assets/videos/coffee.mp4" type="video/mp4" />
        </video>
        <Button label="시작하기" onClick={handleClick} addClass="whitespace-nowrap lg:text-3xl lg:p-4 lg:mb-20 lg:rounded-2xl" />
      </div>
      <div className={infoDivClass}>
        <h1> 내 주변 카페 찾으셈 ! </h1>
        <div>svg</div>
      </div>
      <div className={infoDivClass}>
        <div>svg</div>
        <h1> 내 주변 카페 찾으셈 ! </h1>
      </div>
      <div className={infoDivClass}>
        <h1> 내 주변 카페 찾으셈 ! </h1>
        <div>아이콘</div>
      </div>
    </>
  )
}
