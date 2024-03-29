import { useState } from 'react';
import CafeMenuCard from './CafeMenuCard';
import UpArrow from '../../assets/icons/uparrow.svg?react'
import DownArrow from '../../assets/icons/downarrow.svg?react'
import { CafeMenu } from '../../types/datatype';

const MenuTest: CafeMenu[] = [
    {
        name: '바나바나바니라카노',
        price: 1000,
        imageUrl: '/src/assets/testPic/menu.png',
    },
    {
        name: '아메아메아메리카노',
        price: 10000,
        imageUrl: '/src/assets/testPic/menu.png',
    },
    {
        name: '아아메리카노',
        price: 2000,
        imageUrl: '/src/assets/testPic/menu.png',
    },
    {
        name: '바바나리나카노',
        price: 30000,
        imageUrl: '/src/assets/testPic/menu.png',
    },
    {
        name: '시커먼아메리카노',
        price: 4000,
        imageUrl: '/src/assets/testPic/menu.png',
    },
];

const CafeMenuList = () => {
    const [showAll, setShowAll] = useState(false);

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    return (
        <div className='text-center mx-auto px-4 pt-4 md:w-[80lvw] lg:w-[50lvw]'>
            <label className='text-2xl'>메뉴</label>

            {MenuTest.slice(0, showAll ? MenuTest.length : 2).map((menu, index) => (
                <CafeMenuCard key={index} {...menu} />
            ))}
            <button onClick={toggleShowAll} className='mb-6 text-xl cursor-pointer'>
                {showAll ? (
                    <>
                        숨기기 <UpArrow id='svgIcon' />
                    </>
                ) : (
                    <>
                        더보기 <DownArrow id='svgIcon' />
                    </>
                )}
            </button>
        </div>
    );
};

export default CafeMenuList;
