import { infoProps } from "../../types/datatype"

const InfoDiv = (props: infoProps) => {

    return (
    <div 
    className="bg-[#BAA89B] flex flex-row justify-around bg-opacity-30 h-[30lvh] min-w-[40lvw] mt-[5lvh] items-center text-center shadow-md">
        <img src={props.imgUrl} className="" alt={props.imgAlt}/>
        <div>
          <h1>{props.title}</h1> 
          <span>{props.description}</span>
        </div>
      </div>
  )
}

export default InfoDiv