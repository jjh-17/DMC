import DetailCafeCard from "../../components/cafe/DetailCafeCard";
import SimpleCafeCard from "../../components/cafe/SimpleCafeCard";
import { useDragScroll } from "../../utils/useDragScroll";
import cafeDummyData from "../../assets/testData/cafeDummyData";

const CafeListPage = () => {
  const [ref] = useDragScroll();

  return (
    <>
      <div>
        <div className="mx-auto w-[75lvw]">
          <div ref={ref} className="mx-auto items-center flex flex-row overflow-x-scroll no-scroll">
            {cafeDummyData.map((cafe) => (
              <div key={cafe.cafeSeq}>
                <SimpleCafeCard {...cafe} />
              </div>
            ))}
          </div>
        </div>
        <div className="w-fit mx-auto">
          <div className="flex flex-col">
            {cafeDummyData.map((cafe) => (
              <div className="cursor-pointer" key={cafe.cafeSeq}>
                <DetailCafeCard {...cafe} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CafeListPage;