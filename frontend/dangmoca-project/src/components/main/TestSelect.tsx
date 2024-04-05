import { motion } from "framer-motion"
import cagong from '../../assets/pictures/cagong.jpg';
import calm from '../../assets/pictures/calm.jpg';
import coffee from '../../assets/pictures/coffee.jpg';
import cozy from '../../assets/pictures/cozy.jpg';
import cute from '../../assets/pictures/cute.jpg';
import date from '../../assets/pictures/date.jpg';
import dessert from '../../assets/pictures/dessert.jpg';
import large from '../../assets/pictures/large.jpg';
import mood from '../../assets/pictures/mood.jpg';
import outdoor from '../../assets/pictures/outdoor.jpg';
import petit from '../../assets/pictures/petit.jpg';
import reasonable from '../../assets/pictures/reasonable.jpg';
import snspick from '../../assets/pictures/snspick.jpg';
import view from '../../assets/pictures/view.jpg';

interface Props {
    text: string[],
    isActive: boolean,
    icon: string,
}

const map = new Map();
map.set("cagong", cagong);
map.set("calm", calm);
map.set("coffee", coffee);
map.set("cozy", cozy);
map.set("cute", cute);
map.set("date", date);
map.set("dessert", dessert);
map.set("large", large);
map.set("mood", mood);
map.set("outdoor", outdoor);
map.set("petit", petit);
map.set("reasonable", reasonable);
map.set("snspick", snspick);
map.set("view", view);

export default function TestSelect(props: Props) {
    let divClass = "cursor-pointer mx-auto m-5 flex flex-col whitespace-pre-wrap h-[45lvh] w-[80lvw] md:w-[20lvh] lg:w-[35lvh] items-center gap-4 text-center justify-center border-4 border-primary p-2 hover:text-2xl";
    if (props.isActive) divClass += " bg-primary text-white";
    return (
        <motion.div
            whileHover={{ scale: 1.2 }}
            className={divClass}>
            <img src={map.get(props.icon)} alt="Icon" className='inline-block w-[80lvw] md:w-[20lvh] lg:w-[35lvh] max-h-[25lvh] pointer-events-none' />
            <p className='w-[25lvh] text-xl whitespace-pre-wrap'>{props.text}</p>
        </motion.div>
    );
}
