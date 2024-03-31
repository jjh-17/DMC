import LocationPin from '../../assets/icons/pin.svg?react';
import { useNavigate } from "react-router-dom";
// import { tagMapper } from '../../utils/tag';
import { useEffect } from 'react';
import { Cafe } from '../../types/datatype';
import useCafeStore from '../../stores/cafeStore';

const DetailCafeCard = (cafe: Cafe) => {
  const navigate = useNavigate();
  // const [mappedTags, setMappedTags] = useState<string[]>([]);
  const setSelectedCafeSeq = useCafeStore(state => state.setSelectedCafeSeq);

  useEffect(() => {
    // 태그 수정 후 확인
    // const mappedTagsArray: string[] = cafe.tag.map(tag => tagMapper.get(tag));
    // setMappedTags(mappedTagsArray);
  }, [cafe])

  const handleCafeClick = () => {
    setSelectedCafeSeq(cafe.cafeSeq);
    navigate(`/cafeDetail/${cafe.cafeSeq}`);
  };

  return (
    <div className="p-1 flex flex-col m-4 shadow-xl rounded-sm items-center" onClick={handleCafeClick}>
      <img
        src={cafe.imageUrl}
        className="w-72 h-72 object-cover rounded-sm m-1 border-[1px] border-slate-200"
        alt="Cafe"
      />
      <h1 className="text-2xl font-medium m-2">{cafe.name}</h1>
      <p className="text-[12px]  text-zinc-500">{cafe.address}</p>
      <p className="w-68 my-2 flex justify-end items-center">
        {cafe.distance && <span className="text-[12px] mx-4 ml-0 left-0">
          < LocationPin className="w-3 h-3 mx-1 inline-flex" />
          {Math.round(parseFloat(cafe.distance)) + 'm'}
        </span>}
        {!cafe.distance && <span className='text-white text-[12px]'>  ss  </span>}
        {/* {mappedTags.map((tag, index) => (
          <span className="text-[10px] text-primary mx-1" key={index}>
            #{tag}{" "}
          </span>
        ))} */}
      </p>
    </div>
  );
}

export default DetailCafeCard;
