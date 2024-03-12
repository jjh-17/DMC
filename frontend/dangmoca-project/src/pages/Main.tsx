import Button from "../components/common/Button"

export default function MainPage() {

  const handleClick = () => {
    alert('click');
  };

  return (<div className="mx-auto flex flex-col align-middle my-20 w-fit max-w-screen-sm">
    <p id='test'>강원에듀체 테스트</p>
    <h1 id='test' className="text-5xl font-extrabold text-primary">당모카 DangMoCa</h1>
    <h1 id='test' className="text-4xl font-bold text-primary2">당모카 DangMoCa</h1>
    <h1 id='test' className="text-3xl font-normal text-primary3">당모카 DangMoCa</h1>
    <h1 id='test' className="text-2xl font-light">당모카 DangMoCa</h1>
    <h1 id='test' className="text-xl font-extralight">당모카 DangMoCa</h1>


    <Button text="BUTTON" handleClick={handleClick} />
  </div>
  )
}
