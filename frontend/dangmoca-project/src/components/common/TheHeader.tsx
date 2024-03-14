import React, { useEffect, useState } from 'react';
import PrevArrow from '../../assets/icons/prevarrow.svg?react';
import { useNavigate } from "react-router-dom";

interface HeaderProps {
    textHeader: string;
    showHeader: boolean;
}

const TheHeader: React.FC<HeaderProps> = ({ textHeader, showHeader }) => {
    const [headerClass, setHeaderClass] = useState('fixed top-0 w-full bg-white');

    useEffect(() => {
        const handleScroll = () => {
            const limitHeight = 100;
            const newHeaderClass = window.scrollY > limitHeight ?
                'fixed top-0 w-full bg-white pointer-events-none opacity-0 duration-500' :
                'fixed top-0 w-full bg-white opacity-100 duration-500';

            setHeaderClass(newHeaderClass);
        };

        if (!showHeader) setHeaderClass('pointer-events-none opacity-0');

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navigate = useNavigate();

    return (
        <header className={headerClass}>
            <button onClick={() => navigate(-1)} className='absolute left-2 top-1'>
                <PrevArrow className='m-1 p-[2px]' />
            </button>
            <h1 id='test' className='text-center mx-auto mt-2 text-4xl'>{textHeader}</h1>
        </header>
    );
}

export default TheHeader;
