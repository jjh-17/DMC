interface Props {
  img: string;
  address: string;
  name: string;
}

function SimpleCafeCard (Props: Props): React.ReactElement {
  return (
    <div className="p-1 flex flex-col m-4 items-center">
      <img src={Props.img} className="w-40 h-56 object-cover rounded-sm m-1" alt="Cafe" />
      <h1 className="text-2xl font-thin m-2">{Props.name}</h1>
      <p className="text-[12px] font-light text-slate-700">{Props.address}</p>
    </div>
  );
}

export default SimpleCafeCard;