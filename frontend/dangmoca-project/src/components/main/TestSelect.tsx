import React, { Suspense } from 'react';

interface Props {
    text: string[],
    isActive: boolean,
    icon: string,
}

export default function TestSelect(Props: Props) {
    const Icon = React.lazy(() => import(`../../assets/icons/${Props.icon}.svg?react`));
    let divClass = "cursor-pointer m-5 rounded-xl flex flex-row text-white whitespace-pre-wrap h-[20lvh] w-[40lvh] items-center gap-3 text-center justify-center"        
    if (Props.isActive) divClass += " bg-primary hover:bg-zinc-500 duration-200"
    else divClass += " bg-zinc-500 hover:bg-primary duration-200"
    return (
        <div className={divClass}       
            >
            <Suspense fallback={<div>Loading...</div>}>
                <Icon className='inline-block w-[12lvh] h-]12lvh] fill-white' />
            </Suspense>
            <p className='w-[25lvh]'>{Props.text}</p>
        </div>
    )
}
