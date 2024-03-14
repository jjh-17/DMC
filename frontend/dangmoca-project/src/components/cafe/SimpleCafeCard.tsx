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

const SimpleCafeCard = (cafe : Cafe) => {
  return (
    <div className="w-40 p-1 flex flex-col m-4 items-center">
      <img src={cafe.imageUrl} className="w-40 h-56 object-cover rounded-sm m-1" alt="Cafe" />
      <h1 className="text-2xl font-thin m-2">{cafe.name}</h1>
      <p className="text-[12px] font-light text-slate-700">{cafe.address}</p>
    </div>
  );
}

export default SimpleCafeCard;