import { CafeMenu } from "../../types/datatype"

const CafeMenuCard = (menu: CafeMenu) => {
  return (
    <div className="m-4 flex flex-row items-center shadow-md border-2 border-primary mx-auto">
      <img src={menu.imageUrl} className="w-20 h-20 object-contain m-4 shadow-sm" />
      <div>
        <h1 className="ml-[5lvw]">{menu.name}</h1>
      </div>
    </div>
  )
}

export default CafeMenuCard
