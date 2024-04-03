import { useState } from 'react';
import CafeMenuCard from './CafeMenuCard';
import UpArrow from '../../assets/icons/uparrow.svg?react'
import DownArrow from '../../assets/icons/downarrow.svg?react'
import { CafeMenu } from '../../types/datatype';

interface Props {
    cafeMenu: CafeMenu[];
}

const CafeMenuList = (Props: Props) => {
    const [showAll, setShowAll] = useState(false);

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    return (
        <div className='text-center mx-auto px-4 pt-4 w-[80lvw] md:w-[60lvw] lg:w-[50lvw]'>
            <label className='text-2xl'>메뉴</label>
            {Props.cafeMenu.slice(0, showAll ? Props.cafeMenu.length : 2).map((menuItem, index) => (
                <CafeMenuCard key={index} {...menuItem} />
            ))}
            {
                Props.cafeMenu.length > 2 && (
                    <button onClick={toggleShowAll} className='mb-6 text-xl cursor-pointer'>
                        {showAll ? (
                            <>
                                숨기기 <UpArrow id='svgIcon' />
                            </>
                        ) : (
                            <>
                                더보기 ({Props.cafeMenu.length - 2}) <DownArrow id='svgIcon' />
                            </>
                        )}
                    </button>
                )
            }

        </div>
    );
};

export default CafeMenuList;
