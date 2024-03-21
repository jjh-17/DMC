import DetailCafeCard from "../../components/cafe/DetailCafeCard";
import cafeDummyData from "../../assets/testData/cafeDummyData";
import SortIcon from '../../assets/icons/sort.svg?react';
import DownArrowIcon from '../../assets/icons/downarrow.svg?react'
import CafeFilterAndSort from "../../utils/CafeFilterAndSort";

import { sort, tags, desserts } from '../../assets/data/tag'
import { useState, useEffect, useRef } from "react";

interface Cafe {
  cafeSeq: number;
  name: string;
  distance: string;
  address: string;
  tag: string[];
  isOpen: boolean;
  dessertTag: string[];
  imageUrl: string;
}

const CafeListPage = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showTagCheckbox, setShowTagCheckbox] = useState(false);
  const [showDessertCheckbox, setShowDessertCheckbox] = useState(false);
  const [cafeList, setCafeList] = useState<Cafe[]>([]);

  const findKeyByValue = (object , value:string) => {
    return Object.keys(object).find(key => object[key] === value);
  };

  useEffect(() => {
    cafeDummyData.map(cafe => {
      const updatedTags = cafe.tag.every((tag) => {
        const tagName = findKeyByValue(tags, tag);
        return tagName;
      });

      const updatedDessertTags = cafe.dessertTag.every(dessertTag => {
        const tagName = findKeyByValue(desserts, dessertTag);
        return tagName;
      });

      return {
        ...cafe,
        tag: updatedTags,
        dessertTag: updatedDessertTags,
      };
    });
    setCafeList(cafeDummyData);
  }, [])

  const selectedSorts = useRef<string[]>([]);
  const selectedTags = useRef<string[]>([]);
  const selectedDesserts = useRef<string[]>([]);

  const handleSelectSort = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      selectedSorts.current.push(value);
    } else {
      selectedSorts.current = selectedSorts.current.filter(sort => sort !== value);
    }
  };

  const handleSelectTags = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      selectedTags.current.push(value);
    } else {
      selectedTags.current = selectedTags.current.filter(sort => sort !== value);
    }
  };

  const handleSelectDesserts = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      selectedDesserts.current.push(value);
    } else {
      selectedDesserts.current = selectedDesserts.current.filter(sort => sort !== value);
    }
  };

  const submitFilter = () => {
    setCafeList(cafeDummyData);
    setCafeList(prevCafeList => CafeFilterAndSort(prevCafeList, selectedSorts.current, selectedTags.current, selectedDesserts.current));
  };

  return (
    <>
      <div className="mt-[5lvh] mx-[20lvw]">
        <div className="text-right">
          <button className="relative right-0" onClick={() => setShowFilter(!showFilter)}>
            정렬하기
            <SortIcon className="w-4 h-4 inline-block mx-1" />
          </button>
          {showFilter && (
            <div className="flex flex-col accent-primary3 bg-slate-50">
              <div className="align-middle whitespace-pre-wrap">
                {sort.map((item) => {
                  const label = Object.keys(item);
                  const value = Object.values(item);
                  return (
                    <span className="whitespace-nowrap ml-2" key={label[0]}>
                      <label className="whitespace-nowrap">{label}</label>
                      <input type="checkbox" value={value} onChange={handleSelectSort} />
                    </span>);
                })}
              </div>
              <div>
                태그 선택 체크박스 accordion <DownArrowIcon className="w-4 h-4 inline-block" onClick={() => setShowTagCheckbox(!showTagCheckbox)} />
                {showTagCheckbox && (
                  <div className="align-middle whitespace-pre-wrap">
                    {tags.map((item) => {
                      const label = Object.keys(item)[0];
                      const value = Object.values(item)[0];
                      return (
                        <span className="whitespace-nowrap ml-2" key={label[0]}>
                          <label className="whitespace-nowrap">#{label}</label>
                          <input type="checkbox" value={value} onChange={handleSelectTags} />
                        </span>);
                    })}
                  </div>
                )}
              </div>
              <div>
                디저트 선택 체크박스 accordion <DownArrowIcon className="w-4 h-4 inline-block" onClick={() => setShowDessertCheckbox(!showDessertCheckbox)} />
                {showDessertCheckbox && (
                  <div>
                    {desserts.map((item) => {
                      const label = Object.keys(item)[0];
                      const value = Object.values(item)[0];
                      return (
                        <span className="whitespace-nowrap ml-2" key={label[0]}>
                          <label className="whitespace-nowrap">{label}</label>
                          <input type="checkbox" value={value} onChange={handleSelectDesserts} />
                        </span>);
                    })}
                  </div>
                )}
              </div>
              <div>
                <button onClick={submitFilter}>GO FILTER</button>
              </div>
            </div>

          )}
        </div>
        <div className="w-fit mx-auto">
          <div className="flex flex-col">
            {cafeList.length == 0 && (
              <div>
                <p>해당하는 카페가 없습니다 TT ㅠㅠ 아이쿠</p>
                <p>애니메이션 추가예정</p>
              </div>
            )}

            {cafeList.length > 0 && cafeList.map((cafe) => (




              <div className="cursor-pointer" key={cafe.cafeSeq}>
                <DetailCafeCard {...cafe} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CafeListPage;