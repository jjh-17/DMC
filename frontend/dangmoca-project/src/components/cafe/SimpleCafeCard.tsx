// import { Cafe } from "../../types/datatype";

const SimpleCafeCard = (cafe : any) => {
  return (
    <div className="w-44 p-3 flex flex-col m-4 items-center shadow-md">
      <img src={cafe.imageUrl} className="w-40 h-56 object-cover rounded-sm m-1 pointer-events-none" alt="Cafe" />
      <h1 className="text-2xl font-thin m-2">{cafe.name}</h1>
      <p className="text-[12px] font-light text-slate-700">{cafe.address}</p>
    </div>
  );
}

export default SimpleCafeCard;