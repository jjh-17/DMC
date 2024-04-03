import TestProgress from "../../components/main/TestProgress";
import TestSelect from "../../components/main/TestSelect";
import { questionForTags } from "../../utils/tag";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { memberAPI } from "../../api/memberAPI";
import { motion } from "framer-motion";
import Button from "../../components/common/Button";

export default function CafeTestPage() {
  const [isFirstSelected, setIsFirstSelected] = useState(false);
  const [isSecondSelected, setIsSecondSelected] = useState(false);
  const selectedTags = useRef<string[]>([]);
  const questionLength: number = questionForTags.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [startedTest, setStartedTest] = useState(false);

  const navigate = useNavigate();

  const selectedTagsArray = (idx: number) => {
    return Object.values(Object.values(questionForTags)[currentQuestion * 2 + idx]);
  };

  const handleStartTest = () => {
    setStartedTest(true);
  };

  const handleNextQuestion = async () => {
    if (currentQuestion !== questionLength / 2 - 1) {
      if (isFirstSelected) {
        selectedTags.current.push(selectedTagsArray(0).toString());
      }
      if (isSecondSelected) {
        selectedTags.current.push(selectedTagsArray(1).toString());
      }
      setCurrentQuestion(currentQuestion + 1);
      setIsFirstSelected(false);
      setIsSecondSelected(false);
    } else {
      try {
        const response = await memberAPI.submitTestResult(selectedTags.current);
        if (response.status === 200) {
          Swal.fire({
            didOpen: () => {
              Swal.showLoading();
              setTimeout(() => Swal.fire({
                title: "취향 테스트가 끝났습니다",
                text: "테스트를 반영한 카페 추천 페이지로 이동합니다.",
                confirmButtonText: '좋아요!',
              }), 1000);
            }
          }).then(() => {
            navigate('/mycafe');
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const [button1Active, setButton1Active] = useState(false);
  const [button2Active, setButton2Active] = useState(false);

  const handleButtonClick = (buttonNumber:number) => {
    if (buttonNumber === 1) {
      setButton1Active(!button1Active);
    } else {
      setButton2Active(!button2Active);
    }
  };

  const buttonClass = (isActive:boolean) => {
    return isActive
      ? "border-4 border-primary bg-primary text-white hover:bg-primary w-40 h-40 md:w-52 md:h-52 hover:text-white hover:text-4xl py-2 px-4 rounded whitespace-no-wrap text-2xl md:text-3xl font-bold"
      : "border-4 border-primary hover:bg-primary w-40 h-40 md:w-52 md:h-52 hover:text-white hover:text-4xl py-2 px-4 rounded whitespace-no-wrap text-2xl md:text-3xl font-bold";
  };

  if (!startedTest) {
    return (
      <div className="h-fit mt-[20lvh] my-auto mx-auto flex flex-col w-[80lvw] md:w-[40lvw] lg:w-[40lvw] text-center whitespace-pre-wrap">
        <h1 className="text-4xl font-bold mb-10 text-primary">취향 테스트에 오신걸 환영합니다!</h1>
        <p className="text-xl">두 개의 카페 중 마음에 드는 카페를 고르세요.</p>
        <p className="text-xl"> 둘 다 고르실 수도 있고, 하나도 고르지 않으실 수도 있습니다.</p>
        <div className="flex flex-row justify-center gap-10 mt-[5lvh]">
          <motion.button onClick={() => handleButtonClick(1)} className={buttonClass(button1Active)} whileHover={{ scale: 1.2 }}>
            네!
          </motion.button>
          <motion.button onClick={() => handleButtonClick(2)} className={buttonClass(button2Active)} whileHover={{ scale: 1.2 }}>
            알겠어요!
          </motion.button>
        </div>
        <Button addClass="text-xl lg:text-2xl mt-8 mx-auto" onClick={handleStartTest}
          label="다음" />
      </div>
    );
  }

  return (
    <div className="mt-10 mx-auto flex flex-col w-[80lvw] md:w-[40lvw] lg:w-[40lvw] text-center">
      <ol className="flex items-center ml-[4lvw] my-4">
        {[...Array(7).keys()].map((i) => (
          <TestProgress
            key={i}
            isLast={i === 6 ? true : false}
            isActive={currentQuestion === i ? true : false}
            isDone={currentQuestion > i ? true : false}
          />
        ))}
      </ol>
      <p className="text-xl">마음에 드는 카페를 고르세요.</p>
      {/* 2중택1 컴포넌트 */}
      <div className="flex flex-col md:flex-row lg:flex-row gap-10 mx-auto mt-12 mb-4">
        <div onClick={() =>
          setIsFirstSelected(!isFirstSelected)
        }>
          <TestSelect
            text={Object.keys(Object.values(questionForTags)[currentQuestion * 2])}
            icon={selectedTagsArray(0).toString()}
            isActive={isFirstSelected}
          />
        </div>
        <div onClick={() =>
          setIsSecondSelected(!isSecondSelected)
        }>
          <TestSelect
            text={Object.keys(Object.values(questionForTags)[currentQuestion * 2 + 1])}

            icon={selectedTagsArray(1).toString()}
            isActive={isSecondSelected}
          />
        </div>
      </div>
      <Button addClass="text-xl lg:text-2xl mb-20 mx-auto" onClick={handleNextQuestion}
        label={currentQuestion !== 6 ? "다음" : "카페 추천 받기!"} />
    </div>
  );
}
