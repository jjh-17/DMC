interface Props {
    text: string[],
    isActive: boolean,
    icon: string,
}

export default function TestSelect(props: Props) {
    let divClass = "cursor-pointer mx-auto m-5 flex flex-col whitespace-pre-wrap h-[45lvh] w-[80lvw] md:w-[25lvh] lg:w-[35lvh] items-center gap-3 text-center justify-center border-2 border-primary";
    if (props.isActive) divClass += " bg-primary";
    return (
        <div className={divClass}>
            <img src={`/src/assets/pictures/${props.icon}.jpg`} alt="Icon" className='inline-block max-h-[40lvh] pointer-events-none' />
            <p className='w-[25lvh] whitespace-pre-wrap'>{props.text}</p>
        </div>
    );
}
