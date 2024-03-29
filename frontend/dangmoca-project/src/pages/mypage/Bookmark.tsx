import DetailCafeCard from "../../components/cafe/DetailCafeCard";
// import cafeDummyData from "../../assets/testData/cafeDummyData";
import { cafeAPI } from "../../api/cafe";
import { Cafe, CafeListApiResponse } from "../../types/datatype";
import { useEffect, useState } from "react";
import Pagination from "../../components/common/Pagination";
import BookmarkNotFound from "../../components/cafe/BookmarkNotFound";

export default function Bookmark() {
  const [bookmarkList, setBookmarkList] = useState<Cafe[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  }
  
  const getBookmarkList = async () => {
    try {
      const response = await cafeAPI.getBookmark(1);
      const data: CafeListApiResponse = response.data;
      setEndPage(data.result.totalPages);
      setBookmarkList(data.result.list);
    }
    catch (error) {
      // 타입 별 에러 처리 예정
      console.log(error)
    }
  }

  useEffect(() => {getBookmarkList();}, []);

  useEffect(() => {
    cafeAPI.getBookmark(currentPage).then((response) => {
      setBookmarkList(response.data.result.list);
    })
  }, [currentPage])

  // cafeAPI.getBookmark();

  return (
    <div className="w-fit mx-auto pt-10">
      <div className="flex flex-col">
        {bookmarkList && bookmarkList.map((cafe) => (
          <div key={cafe.cafeSeq}>
            <DetailCafeCard {...cafe} />
          </div>
        ))}
        {
          bookmarkList && bookmarkList.length == 0 && <BookmarkNotFound />
        }
      </div>
        {
          endPage > 1 && 
          <Pagination currentPage={currentPage} endPage={endPage} onPageChange={handlePageChange}/>
        }

    </div>
  );
}
