import TestProgress from "../../components/main/TestProgress";
import TestSelect from "../../components/main/TestSelect";
import { questionForTags } from "../../assets/data/tag";
import { useRef, useState } from "react";

export default function CafeTestPage() {
  const [isFirstSelected, setIsFirstSelected] = useState(false);
  const [isSecondSelected, setIsSecondSelected] = useState(false);
  const selectedTags = useRef<string[]>([]);
  const questionLength: number = questionForTags.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);

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
      // submit 후 취향 결과 페이지 보여줌
      console.log(selectedTags.current);
    }
  };

  return (
    <div className="my-10 mx-auto flex flex-col w-[80lvw] md:w-[40lvw] lg:w-[40lvw] text-center">
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
      <p>마음에 드는 카페를 고르세요 (중복 가능) </p>
      {/* 2중택1 컴포넌트 */}
      <div className="flex flex-col mx-auto mt-12 mb-4">
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
      <button onClick={handleNextQuestion} className="text-xl ">
        {currentQuestion !== 6 ? "다음" : "테스트 결과 확인하기"}
      </button>
    </div>
  );
}
