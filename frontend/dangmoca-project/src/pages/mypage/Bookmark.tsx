import DetailCafeCard from "../../components/cafe/DetailCafeCard";
import cafeDummyData from "../../assets/testData/cafeDummyData";
import { cafeAPI } from "../../api/cafe";

export default function Bookmark() {

  // cafeAPI.getBookmark();

  return (
    <div className="w-fit mx-auto pt-10">
      <div className="flex flex-col">
        {cafeDummyData.map((cafe) => (
          <div key={cafe.cafeSeq}>
            <DetailCafeCard {...cafe} />
          </div>
        ))}
      </div>
    </div>
  );
}
