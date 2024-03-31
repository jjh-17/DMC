import { motion } from "framer-motion"

interface Props {
    text: string[],
    isActive: boolean,
    icon: string,
}

export default function TestSelect(props: Props) {
    let divClass = "cursor-pointer mx-auto m-5 flex flex-col whitespace-pre-wrap h-[45lvh] w-[80lvw] md:w-[25lvh] lg:w-[35lvh] items-center gap-4 text-center justify-center border-4 border-primary p-2";
    if (props.isActive) divClass += " bg-primary text-white";
    return (
        <motion.div 
        whileHover={{scale:1.2}}
        className={divClass}>
            <img src={`/src/assets/pictures/${props.icon}.jpg`} alt="Icon" className='inline-block max-h-[40lvh] pointer-events-none' />
            <p className='w-[25lvh] whitespace-pre-wrap'>{props.text}</p>
        </motion.div>
    );
}
