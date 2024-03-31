import { CafeMenu } from "../../types/datatype"

const CafeMenuCard = (menu: CafeMenu) => {
  return (
    <div className="m-4 flex flex-row items-center shadow-md bg-primary bg-opacity-10 border-2 border-primary2 mx-auto">
      <img src={menu.imageUrl} className="w-20 h-20 object-contain m-4 shadow-sm" />
      <h1 className="ml-[3lvw]">{menu.name}</h1>
    </div>
  )
}

export default CafeMenuCard
