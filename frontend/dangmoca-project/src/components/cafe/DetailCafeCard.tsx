interface Cafe {
    cafeSeq: number;
    name: string;
    imageUrl: string;
    address: string;
    distance: number;
    tag: string[]; // Assuming tags are strings
  }
  
  export default function DetailCafeCard({ cafe }: { cafe: Cafe }) {
    return (
      <div className="p-[2px] flex flex-col m-4 shadow-lg rounded-sm items-center">
        <img src={cafe.imageUrl} className="w-60 h-60 object-cover rounded-sm mb-1" alt="Cafe" />
        <h1 className="text-[18px] font-medium">{cafe.name}</h1>
        <p className="text-[8px] font-semilight text-slate-700">{cafe.address}</p>
        <p className="w-36">
          <span className="text-[8px]">{cafe.distance}m</span>
          {cafe.tag.map((tag, index) => (
            <span className="text-[8px] text-primary mr-0" key={index}>{tag} </span>
          ))}
        </p>
      </div>
    );
  }