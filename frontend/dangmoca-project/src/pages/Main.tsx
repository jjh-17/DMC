import Button from "../components/common/Button"
import { useNavigate } from "react-router-dom";

export default function MainPage() {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login')
  };

  return (<div className="mx-auto flex flex-col items-center my-20 w-fit max-w-screen-sm gap-2">
    <p id='test'>강원에듀체 테스트</p>
    <h1 id='test' className="text-5xl font-extrabold text-primary">당모카 DangMoCa</h1>
    <h1 id='test' className="text-4xl font-bold text-primary2">당모카 DangMoCa</h1>
    <h1 id='test' className="text-3xl font-normal text-primary3">당모카 DangMoCa</h1>
    <h1 id='test' className="text-2xl font-light">당모카 DangMoCa</h1>
    <h1 id='test' className="text-xl font-black">당모카 DangMoCa</h1>


    <Button label="로그인테스트" onClick={handleClick} />
  </div>
  )
}
