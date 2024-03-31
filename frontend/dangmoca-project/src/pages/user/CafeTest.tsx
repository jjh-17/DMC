import TestProgress from "../../components/main/TestProgress";
import TestSelect from "../../components/main/TestSelect";
import { questionForTags } from "../../utils/tag";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { memberAPI } from "../../api/memberAPI";

export default function CafeTestPage() {
  const [isFirstSelected, setIsFirstSelected] = useState(false);
  const [isSecondSelected, setIsSecondSelected] = useState(false);
  const selectedTags = useRef<string[]>([]);
  const questionLength: number = questionForTags.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const navigate = useNavigate();

  const selectedTagsArray = (idx: number) => {
    return Object.values(Object.values(questionForTags)[currentQuestion * 2 + idx]);
  };

  const handleNextQuestion = () => {
    if (currentQuestion !== questionLength / 2 - 1) {
      if (isFirstSelected) {
        selectedTags.current.push(selectedTagsArray(0).toString() as string);
      }
      if (isSecondSelected) {
        selectedTags.current.push(selectedTagsArray(1).toString() as string);
      }
      setCurrentQuestion(currentQuestion + 1);
      setIsFirstSelected(false);
      setIsSecondSelected(false);
    } else {
      memberAPI.submitTestResult(selectedTags.current);
      Swal.fire({
        didOpen: () => {
          Swal.showLoading()
          setTimeout(() => Swal.fire({
            title: "취향 테스트가 끝났습니다",
            text: "테스트를 반영한 카페 추천 페이지로 이동합니다.",
            confirmButtonText: '좋아요!',
          }), 1000)
        }
      }).then(() => {
        navigate('/myCafe');
      })
    }
  };

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
      <p className="text-xl">마음에 드는 카페를 고르세요 (중복 가능) </p>
      {/* 2중택1 컴포넌트 */}
      <div className="flex flex-col md:flex-row lg:flex-row gap-6 mx-auto mt-12 mb-4">
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
      <button className="text-2xl" onClick={handleNextQuestion} >
        {currentQuestion !== 6 ? "다음" : "카페 추천 받기!"}
      </button>
    </div>
  );
}
