// import { ReactComponent as Locationpin } from  '../../assets/icons/pin.svg?react';

interface Cafe {
  cafeSeq: number;
  name: string;
  distance: string;
  address: string;
  tag: string[];
  isOpen: boolean;
  dessertTag: string[];
  imageUrl: string;
}

const DetailCafeCard: React.FC<{ cafe: Cafe }> = (cafe) => {
  return (
    <div className="p-1 flex flex-col m-4 shadow-lg rounded-sm items-center">
      <img
        src={cafe.imageUrl}
        className="w-72 h-72 object-cover rounded-sm m-1"
        alt="Cafe"
      />
      <h1 className="text-2xl font-medium m-2">{cafe.name}</h1>
      <p className="text-[12px] font-light text-slate-700">{cafe.address}</p>
      <p className="w-68 mb-2 flex justify-end items-center">
        <span className="text-[12px] mx-4 ml-0 left-0">
          {/* <Locationpin />  */}
          {cafe.distance}m
        </span>
        {cafe.tag.map((tag, index) => (
          <span className="text-[10px] text-primary mx-1" key={index}>
            {tag}{" "}
          </span>
        ))}
      </p>
    </div>
  );
}

export default DetailCafeCard;
