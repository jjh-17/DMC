import { CafeMenu } from "../../types/datatype"
import CafeAlt from '../../assets/icons/cafe-alt.png';

const CafeMenuCard = (menu: CafeMenu) => {
  return (
    <div className="m-4 flex flex-row items-center shadow-md bg-primary bg-opacity-10 border-2 border-primary2 mx-auto">
      <img src={menu.imageUrl|| CafeAlt } className="w-24 h-24 object-contain m-4 shadow-sm" />
      <h1 className="ml-[3lvw] text-xl font-light">{menu.name}</h1>
      <h1>{menu.price}</h1>
    </div>
  )
}

export default CafeMenuCard
