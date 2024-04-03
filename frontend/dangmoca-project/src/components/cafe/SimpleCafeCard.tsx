import RightArrowIcon from "../../assets/icons/rightarrow.svg?react";
import { useNavigate } from "react-router-dom";
import cafeAlt from "../../assets/icons/cafe-alt.png";
import useCafeStore from "../../stores/cafeStore";

const SimpleCafeCard = (cafe: any) => {
  const navigate = useNavigate();
  const setSelectedCafeSeq = useCafeStore(state => state.setSelectedCafeSeq);
  
  let name = "";
  if (cafe.name.length > 6) {
    name = cafe.name.substring(0, 6) + "..";
  } else name = cafe.name;
  console.log(cafe);

  const handleCafeDetailClick = () => {
    setSelectedCafeSeq(cafe.cafeSeq);
    navigate(`/cafeDetail/${cafe.cafeSeq}`);
  };

  return (
    <div className="w-44 p-3 flex flex-col m-4 items-center shadow-md">
      <img
        src={cafe.imageUrl || cafeAlt}
        className="w-40 h-56 object-cover rounded-sm m-1 pointer-events-none"
        alt="Cafe"
      />
      <h1 className="text-xl font-thin m-2 w-36 whitespace-pre-wrap">{name}</h1>
      <p className="text-[12px] font-light text-slate-700 w-36 whitespace-no-wrap">
        {cafe.address}
      </p>
      <div className="text-right w-full hover:text-primary">
        <button
          className="text-[12px]"
          onClick={handleCafeDetailClick}
        >
          {" "}
          상세보기 <RightArrowIcon className="w-[12px] h-[12px] inline-block" />{" "}
        </button>
      </div>
    </div>
  );
};

export default SimpleCafeCard;
