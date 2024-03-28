import Pagination from "../../components/common/Pagination";
import DetailCafeCard from "../../components/cafe/DetailCafeCard";
import cafeDummyData from "../../assets/testData/cafeDummyData";
import CafeLoading from "../../components/cafe/CafeLoading";
import CafeNotFound from "../../components/cafe/CafeNotFound";
import SortIcon from "../../assets/icons/sort.svg?react";
import RightArrowIcon from "../../assets/icons/rightarrow.svg?react";
import DownArrowIcon from "../../assets/icons/downarrow.svg?react";
import CafeFilterAndSort from "../../utils/CafeFilterAndSort";

import { sort, tags } from "../../utils/tag";
import { useState, useEffect, useRef } from "react";
import { Cafe } from "../../types/datatype";
import { cafeAPI } from '../../api/cafe'
import { CafeListApiResponse } from "../../types/datatype";

const CafeListPage = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showTagCheckbox, setShowTagCheckbox] = useState(false);
  const [cafeList, setCafeList] = useState<Cafe[] | undefined>([]);
  const hasSearched = useRef(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [endPage, setEndPage] = useState<number>(1);
  const isSearch = useRef(false);
  const searchKeyword = useRef("");
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  }

  // useEffect(() => {
  //   setCafeList(cafeDummyData);
  // }, []);

  const getCafeList = async () => {
    const currentUrl = window.location.href;

    // URL을 URLSearchParams 객체로 변환
    const urlParams = new URLSearchParams(currentUrl);

    // 'cafes' 뒤의 키워드 추출
    const keyword = urlParams.get('cafes');

    // 추출된 키워드 사용
    console.log(keyword);

    if (keyword != null) {
      isSearch.current = true;
      searchKeyword.current = keyword || "";
      try {
        const response = await cafeAPI.getCafeSearchList(1, keyword);
        const data: CafeListApiResponse = response.data;
        setEndPage(data.result.totalCount);
        setCafeList(data.result.list);
      }
      catch (error) {
        console.log(error);
      }

    }
    else {
      console.log(1)
      try {
        const response = await cafeAPI.getCafeList(1);
        const data: CafeListApiResponse = response.data;
        setEndPage(data.result.totalCount);
        setCafeList(data.result.list);
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    getCafeList();
  }, []);

  useEffect(() => {
    if (isSearch.current) {
      cafeAPI.getCafeSearchList(currentPage, searchKeyword.current).then((response) => {
        setCafeList(response.data.result.list);
      })
    }
    else {
      cafeAPI.getCafeList(currentPage).then((response) => {
        setCafeList(response.data.result.list);
      })
    }
  }, [currentPage]);

  const selectedSorts = useRef<string[]>([]);
  const selectedTags = useRef<string[]>([]);
  const selectedDesserts = useRef<string[]>([]);

  const handleSelectSort = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      selectedSorts.current.push(value);
    } else {
      selectedSorts.current = selectedSorts.current.filter(
        (sort) => sort !== value
      );
    }
  };


  const handleSelectTags = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      selectedTags.current.push(value);
    } else {
      selectedTags.current = selectedTags.current.filter(
        (sort) => sort !== value
      );
    }
  };

  const submitFilter = () => {
    hasSearched.current = true;
    setCafeList(cafeDummyData);
    setCafeList((prevCafeList) =>
      CafeFilterAndSort(
        prevCafeList||[],
        selectedSorts.current,
        selectedTags.current,
        selectedDesserts.current
      )
    );
  };
  const toggleFilter = () => setShowFilter(!showFilter);
  const toggleTag = () => setShowTagCheckbox(!showTagCheckbox);

  return (
    <>
      <div className="mt-[5lvh] mx-[10lvw]">
        <div className="text-right">
          <button
            className="relative right-0 font-light text-primary2 cursor-pointer"
            onClick={toggleFilter}
          >
            정렬
            <SortIcon className="w-7 h-7 rounded-full m-1 mx-2 p-1 shadow-md inline-block" />
          </button>
          {showFilter && (
            <div className="flex flex-col accent-primary3  gap-1 font-light mr-4 my-2">
              <div className="align-middle whitespace-pre-wrap">
                {sort.map((item, index) => {
                  const label = Object.keys(item)[0];
                  const value = Object.values(item)[0];
                  const inputId = index.toString();

                  return (
                    <span
                      className="whitespace-nowrap ml-2 hover:text-primary2"
                      key={label}
                    >
                      <label htmlFor={inputId} className="whitespace-nowrap">
                        {label}
                      </label>
                      <input
                        id={inputId}
                        type="checkbox"
                        value={value}
                        onChange={handleSelectSort}
                      />
                    </span>
                  );
                })}
              </div>
              <div>
                <span
                  className="font-medium m-2 cursor-pointer"
                  onClick={toggleTag}
                >
                  태그 선택하기
                </span>
                {!showTagCheckbox && (
                  <RightArrowIcon id="svgIcon" onClick={toggleTag} />
                )}
                {showTagCheckbox && (
                  <>
                    <DownArrowIcon id="svgIcon" onClick={toggleTag} />
                    <div className="align-middle whitespace-pre-wrap mt-2 bg-slate-50">
                      {tags.map((item, index) => {
                        const label = Object.keys(item)[0];
                        const value = Object.values(item)[0];
                        const inputId = (index + 100).toString();

                        return (
                          <span
                            className="whitespace-nowrap ml-2 hover:text-primary"
                            key={label}
                          >
                            <label
                              className="whitespace-nowrap mx-1"
                              htmlFor={inputId}
                            >
                              #{label}
                            </label>
                            <input
                              type="checkbox"
                              value={value}
                              id={inputId}
                              onChange={handleSelectTags}
                            />
                          </span>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
              <div className="">
                <button
                  onClick={submitFilter}
                  className="text-primary2 font-medium hover:font-bold"
                >
                  필터 적용하기
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="w-fit mx-auto">
          <div className="flex flex-col">
            
            {!cafeList && !hasSearched && <CafeLoading />}
            {!cafeList && hasSearched && <CafeNotFound />}

            {cafeList &&
              cafeList.map((cafe) => (
                <div className="cursor-pointer" key={cafe.cafeSeq}>
                  <DetailCafeCard {...cafe} />
                </div>
              ))}
          </div>
        </div>
      </div>
      <Pagination currentPage={currentPage} endPage={endPage} onPageChange={handlePageChange} />
    </>
  );
};

export default CafeListPage;
