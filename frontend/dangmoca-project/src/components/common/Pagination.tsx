import { useEffect, useRef, useState } from "react";
import PrevArrowIcon from '../../assets/icons/rightarrow.svg?react';

interface Props {
  currentPage: number;
  endPage: number;
  onPageChange: (page:number) => void;
}

const Pagination = ({currentPage, endPage, onPageChange}: Props) => {
  const [curPage, setCurPage] = useState(currentPage);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurPage(currentPage);
  }, [currentPage, endPage]);

  const handlePrevPage = () => {
    if (curPage > 1) setCurPage(curPage - 1);
  }

  const handleNextPage = () => {
    if (curPage < endPage) setCurPage(curPage + 1);
  }

  const handleInput = () => {
    const inputValue = parseInt(input.current?.value || "");
    if (isNaN(inputValue) || inputValue < 1 || inputValue > endPage) {
      alert("올바른 숫자를 입력해주세요.");
      setCurPage(curPage)
    } else {
      setCurPage(inputValue);
    }
  }

  useEffect(() => {  
    if (input.current) {
      input.current.value = curPage.toString();
    }
    onPageChange(curPage);
  }, [curPage, endPage, onPageChange]);

  const defaultIconClass = "w-6 h-4 mx-2 inline-block";
  const prevIconClass = defaultIconClass + (curPage == 1 ? " rotate-180 fill-slate-300" : " rotate-180 cursor-pointer");
  const nextIconClass = defaultIconClass + (curPage == endPage ? " fill-slate-300" : " cursor-pointer");

  return (
    <div className="mx-auto w-fit align-middle ">
      <button onClick={handlePrevPage} disabled={curPage == 1}>
        <PrevArrowIcon className={prevIconClass} />
      </button>
      <span className="text-center">
        <input
          defaultValue={curPage}
          className="w-6 h-6 text-center"
          ref={input} />
        / {endPage}
      </span>
      <button className="ml-2 text-primary hover:underline" onClick={handleInput}>이동</button>
      <button onClick={handleNextPage} disabled={curPage == endPage}>
        <PrevArrowIcon className={nextIconClass} />
      </button>
    </div>
  )
}

export default Pagination;
