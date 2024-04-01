// import { Cafe } from "../../types/datatype";
import RightArrowIcon from '../../assets/icons/rightarrow.svg?react'
import { useNavigate } from "react-router-dom";
import cafeAlt from "../../assets/icons/cafe-alt.png"

const SimpleCafeCard = (cafe : any) => {
  const navigate = useNavigate();
  return (
    <div className="w-44 p-3 flex flex-col m-4 items-center shadow-md">
      <img src={cafe.imageUrl || cafeAlt} className="w-40 h-56 object-cover rounded-sm m-1 pointer-events-none" alt="Cafe" />
      <h1 className="text-2xl font-thin m-2">{cafe.name}</h1>
      <p className="text-[12px] font-light text-slate-700">{cafe.address}</p>
      <div className="text-right w-full hover:text-primary">
      <button className="text-[12px]" onClick={() => navigate(`/cafeDetail/${cafe.cafeSeq}`)}> 상세보기 <RightArrowIcon className="w-[12px] h-[12px] inline-block"/> </button>
      </div>
    </div>
  );
}

export default SimpleCafeCard;