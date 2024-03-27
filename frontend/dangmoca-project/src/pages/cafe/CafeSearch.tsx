import SearchIcon from '../../assets/icons/search.svg?react';
import CancelIcon from '../../assets/icons/cancel.svg?react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import DateFormatter from '../../utils/DateFormatter';

interface History {
    index: number;
    keyword: string;
    datetime: Date;
}

export default function CafeSearch() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [searchHistory, setSearchHistory] = useState<History[]>([]); // Define the type of searchHistory

    useEffect(() => {
        const storedHistory = localStorage.getItem('searchHistory');
        if (storedHistory) {
            setSearchHistory(JSON.parse(storedHistory));
        }
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    };

    const submitKeyword = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const idx: number = searchHistory.length > 0 ? searchHistory[0].index : 0;
        const newSearchItem: History = {
            index: idx + 1,
            keyword: keyword,
            datetime: new Date(),
        };

        setSearchHistory([newSearchItem, ...searchHistory]);
        localStorage.setItem('searchHistory', JSON.stringify([newSearchItem, ...searchHistory]));
        navigate(`/cafes?${keyword}`); // query로 keyword 전달하기
    };

    const deleteSearchHistoryItem = (index: number) => {
        setSearchHistory(searchHistory.filter(item => item.index !== index));
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory.filter(item => item.index !== index)));
    };

    const deleteSearchHistoryAll = () => {
        setSearchHistory([]);
        localStorage.removeItem('searchHistory');
    };

    return (
        <div className="mx-10 font-light pt-10">
            <form onSubmit={submitKeyword}>
                <SearchIcon id="svgIcon" />
                <input
                    className="align-middle shadow-sm m-4 lg:w-[40lvw] md:w-[40lvw] sm:w-[60lvw] h-10 p-2 focus:border-[1px] focus:border-slate-200"
                    placeholder="검색어를 입력하세요"
                    value={keyword}
                    onChange={handleInputChange}
                />
                <button type="submit" className='text-primary2'>검색</button>
            </form>
            <span className='text-primary3'>최근 검색 내역</span>
            <button onClick={deleteSearchHistoryAll} className='text-xs font-light float-end hover:text-red-500'>검색 내역 삭제</button>
            <ul>
                {searchHistory.map((item) => (
                    <li key={item.index} className='border-b-[1px] border-slate-300 p-1 m-1'>
                        <div className='flex flex-row justify-between'>
                            <button className='text-left w-[40lvw]'
                            onClick={() => setKeyword(item.keyword)}
                            >{item.keyword}</button>
                            <span>{DateFormatter(item.datetime)}</span>
                            <button onClick={() => deleteSearchHistoryItem(item.index)}
                                className='right-0'>
                                    <CancelIcon id='svgIcon' />
                                </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
