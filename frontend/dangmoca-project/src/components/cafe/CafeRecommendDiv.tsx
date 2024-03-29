import { Cafe } from "../../types/datatype";
import { useDragScroll } from "../../utils/useDragScroll";
import SimpleCafeCard from "./SimpleCafeCard";
import LoadingIcon from '../../assets/icons/loading.svg?react'

interface Props {
  title: string,
  CafeList: Cafe[];
}

const CafeRecommendDiv = (Props: Props) => {
  const [setRef] = useDragScroll();

  const handleRef = (node: HTMLElement | null) => {
    if (node) {
      setRef(node);
    }
  };
  
  return (
    <div className="my-10">
      <h1 id='test' className="text-2xl lg:text-3xl"># {Props.title}</h1>
      {Props.CafeList.length > 0 && <div className="mx-auto whitespace-nowrap">
        <div ref={handleRef} className="flex flex-row overflow-x-scroll no-scroll">
          {Props.CafeList.map((cafe) => (
            <div key={cafe.cafeSeq}>
              <SimpleCafeCard {...cafe} />
            </div>
          ))}
        </div>
      </div>}
      {Props.CafeList.length == 0 &&

        <div className="pb-10">
          {/* <img src='/src/assets/pictures/naver_map.png' /> */}
          <div className="h-[322px]  m-4 flex flex-col items-center justify-center">
            <div className="text-center animate-pulse">
              <img src="/src/assets/icons/logo1.svg" className="mb-4"/> 
              <span id="test" className="text-lg lg:text-xl align-middle">카페를 불러오고 있어요  <LoadingIcon className="w-6 h-6 lg:w-10 lg:h-10 inline-block animate-spin" /> </span>
            </div>
          </div>

        </div>
      }
    </div>
  )
}

export default CafeRecommendDiv;