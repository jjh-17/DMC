import LocationPin from '../../assets/icons/pin.svg?react';
import { useNavigate } from "react-router-dom";
import { tagMapper } from '../../utils/tag';
import { Cafe } from '../../types/datatype';
import useCafeStore from '../../stores/cafeStore';
import SadCoffeeUrl from '../../assets/pictures/sadcoffee.png'

const DetailCafeCard = (cafe: Cafe) => {
  const navigate = useNavigate();
  const setSelectedCafeSeq = useCafeStore(state => state.setSelectedCafeSeq);




  const handleCafeClick = () => {
    setSelectedCafeSeq(cafe.cafeSeq);
    navigate(`/cafeDetail/${cafe.cafeSeq}`);
  };

  return (
    <div className="p-1 flex flex-col m-4 shadow-xl rounded-sm items-center" onClick={handleCafeClick}>
      <img
        src={cafe.imageUrl || SadCoffeeUrl}
        className="w-72 h-72 object-cover rounded-sm m-2"
        alt="Cafe"
      />
      <h1 className="text-2xl font-medium m-3 max-w-64 my-2 whitespace-break-spaces">{cafe.name}</h1>
      <p className="text-slate-500 text-[14px]">{cafe.address}</p>
      <p className="w-68 my-2 flex justify-end items-center">
        {cafe.distance && <span className=" mx-4 ml-0 left-0 text-sm">
          < LocationPin className="w-4 h-4 mx-1 inline-flex text-slate-500" />
          {Math.round(parseFloat(cafe.distance)) + 'm'}
        </span>}
        {!cafe.distance && <span className='text-white text-[12px]'>  ss  </span>}
        {Array.isArray(cafe.tag) && cafe.tag.length > 0 && (
          <div className="flex overflow-x-auto p-4">
            {cafe.tag.map((tag: string, index: number) => (
              <span key={index} className="mx-1 text-black">
                #{tagMapper.get(tag)}
              </span>
            ))}
          </div>
        )

        }
      </p>
    </div>
  );
}

export default DetailCafeCard;
