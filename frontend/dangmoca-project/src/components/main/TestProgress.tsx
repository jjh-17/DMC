import { motion } from "framer-motion"

interface Props {
    isLast : boolean,
    isActive : boolean,
    isDone: boolean,
}

export default function TestProgress(Props: Props) {
    let defaultClass = "flex w-full items-center text-primary "
    let defaultSpanClass = "w-[3lvw] h-[3lvw] md:w-[1.5lvw] md:h-[1.5lvw] lg:w-[1lvw] lg:h-[1lvw] flex items-center justify-center border-[2px] rounded-full shrink-0 ";
    
    if (!Props.isLast) defaultClass += " after:w-full after:border-b after:border-primary after:border-[1px] after:inline-block"
    if (!Props.isActive) {
        if (Props.isDone) defaultSpanClass += " bg-primary"
        else defaultSpanClass += " bg-opacity-70";
    }
    if (Props.isActive) defaultSpanClass += " bg-primary bg-opacity-80 ";

    return (
        <li className={defaultClass}>
            <motion.div
            animate={{
                scale: Props.isActive? [1, 1.2, 1.3, 1.2, 1]: [1],
            }}
            transition={{repeat: Infinity}}
            className={defaultSpanClass} />
        </li>
    )
}
