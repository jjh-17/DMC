import { infoProps } from "../../types/datatype"
import { motion } from "framer-motion";
import AnalysisMainIcon from '../../assets/icons/analysismain.svg?react';
import BookmarkMainIcon from '../../assets/icons/bookmarkmain.svg?react'
import CafeMainIcon from '../../assets/icons/cafemain.svg?react';

const InfoDiv = (props: infoProps) => {
  const initial = {
    y: 50,
    opacity: 0,
  }

  const whileInView = {
    y: 0,
    opacity: 100,
  }

  const viewport = { once: true, amount: 0.8 }
  const svgClass = "inline-block w-64 h-64 my-10"

  return (
    <div
      className="flex flex-col justify-around
        w-fit px-[5lvw] pb-[20lvh] h-fit items-center text-center">
      <div>
        <motion.h1
          initial={initial} whileInView={whileInView} viewport={viewport} transition={{
            duration: 0.8, delay: props.delay[0]
          }}
          className="text-3xl md:text-4xl lg:text-5xl mb-4 whitespace-pre-wrap text-primary2"
          id="test"
        >{props.title}</motion.h1>
        <motion.div
          initial={initial} whileInView={whileInView} viewport={viewport} transition={{
            duration: 0.8, delay: props.delay[0]
          }}
        >
          {
            props.icon == "analysis" && <AnalysisMainIcon 
            className={svgClass}
            />
          }
          {
            props.icon == "bookmark" && <BookmarkMainIcon 
            className={svgClass}
            />
          }
          {
            props.icon == "cafe" && <CafeMainIcon
            className={svgClass}
            />
          }
        </motion.div>
        <motion.p
          initial={initial} whileInView={whileInView} viewport={viewport} transition={{
            duration: 0.9, delay: props.delay[1]
          }}
          className="whitespace-pre-wrap text-3xl lg:text-4xl mb-2"
          id="test"
        >{props.description[0]}</motion.p>
        <motion.p
          initial={initial} whileInView={whileInView} viewport={viewport} transition={{
            duration: 0.9, delay: props.delay[1]
          }}
          className="whitespace-pre-wrap text-2xl lg:text-3xl"
          id="test"
        >{props.description[1]}</motion.p>
      </div>
    </div>
  )
}

export default InfoDiv