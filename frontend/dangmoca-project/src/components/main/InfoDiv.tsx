import { infoProps } from "../../types/datatype"
import { motion } from "framer-motion";

const InfoDiv = (props: infoProps) => {
  const initial = {
    y: 100,
    opacity: 0,
  }

  const whileInView = {
    y: 0,
    opacity: 100,
  }

  const viewport = { once: true, amount: 0.5 }

  return (
    <div
      className="flex flex-row justify-around bg-opacity-30 h-fit
        w-[80lvw] md:w-[60lvw] lg:w-[50lvw] mx-auto mt-[10lvh] items-center text-center">
      <div>
        <motion.h1
          initial={initial} whileInView={whileInView} viewport={viewport} transition={{
            duration: 1.2, delay: props.delay[0]
          }}
          className="text-3xl md:text-4xl mb-4 whitespace-nowrap text-primary2"
          id="test"
          >{props.title}</motion.h1>
        <motion.p
          initial={initial} whileInView={whileInView} viewport={viewport} transition={{
            duration: 1.2, delay: props.delay[1]
          }}
          className="whitespace-nowrap text-2xl md:text-3xl"
          id="test"
          >{props.description}</motion.p>
      </div>
    </div>
  )
}

export default InfoDiv