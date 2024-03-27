import LocationPin from '../../assets/icons/pin.svg?react';
import { useNavigate } from "react-router-dom";
import { tagMapper } from '../../assets/data/tag';
import { useEffect, useState } from 'react';
import { Cafe } from '../../types/datatype';

const DetailCafeCard = (cafe: Cafe) => {
  const navigate = useNavigate();
  const [mappedTags, setMappedTags] = useState<string[]>([]);

  useEffect(() => {
    const mappedTagsArray: string[] = cafe.tag.map(tag => tagMapper.get(tag));
    setMappedTags(mappedTagsArray);
  }, [cafe])

  return (
    <div className="p-1 flex flex-col m-4 shadow-lg rounded-sm items-center" onClick={() => navigate(`/cafeDetail/${cafe.cafeSeq}`)}>
      <img
        src={cafe.imageUrl}
        className="w-72 h-72 object-cover rounded-sm m-1"
        alt="Cafe"
      />
      <h1 className="text-2xl font-medium m-2">{cafe.name}</h1>
      <p className="text-[12px] font-light text-slate-700">{cafe.address}</p>
      <p className="w-68 my-2 flex justify-end items-center">
        <span className="text-[12px] mx-4 ml-0 left-0">
          <LocationPin className="w-3 h-3 mx-1 inline-flex" />
          {cafe.distance}m
        </span>
        {mappedTags.map((tag, index) => (
          <span className="text-[10px] text-primary mx-1" key={index}>
            #{tag}{" "}
          </span>
        ))}
      </p>
    </div>
  );
}

export default DetailCafeCard;
