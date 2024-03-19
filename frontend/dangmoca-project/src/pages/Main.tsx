import Button from "../components/common/Button"
import { useNavigate } from "react-router-dom";
import MainLogo1 from '../assets/icons/logo1.svg?react';
import MainLogo2 from '../assets/icons/logo2.svg?react';

export default function MainPage() {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login')
  };

  return (<div
    className="mx-auto flex flex-col items-center w-full min-h-screen pt-10">
    <h1>LOGO</h1>
    <MainLogo1 />
    <MainLogo2 />
    <hr />
    <h1 id='test' className="text-5xl font-extrabold text-primary">당모카 DangMoCa</h1>
    <h1 id='test' className="text-4xl font-bold text-primary2">당모카 DangMoCa</h1>
    <h1 id='test' className="text-3xl font-normal text-primary3">당모카 DangMoCa</h1>
    <h1 id='test' className="text-2xl font-light">당모카 DangMoCa</h1>
    <h1 id='test' className="text-xl font-black">당모카 DangMoCa</h1>


    <Button label="로그인테스트" onClick={handleClick} />
  </div>
  )
}
