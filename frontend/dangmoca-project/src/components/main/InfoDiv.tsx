import { infoProps } from "../../types/datatype"
import { motion } from "framer-motion";

const InfoDiv = (props: infoProps) => {
  return (
    <motion.div
      initial={{
        x: 100,
        opacity: 0,
      }}
      whileInView={{
        x: 0,
        opacity: 100,
      }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{
        duration: 1.2,
        delay: 0.3,
      }}
      className="flex flex-row justify-around bg-opacity-30 h-fit
        w-[80lvw] md:w-[60lvw] lg:w-[50lvw] mx-auto mt-[10lvh] items-center text-center">
      <div>
        <h1 className="text-3xl mb-4">{props.title}</h1>
        <p className="whitespace-nowrap text-2xl">{props.description}</p>
      </div>
    </motion.div>
  )
}

export default InfoDiv