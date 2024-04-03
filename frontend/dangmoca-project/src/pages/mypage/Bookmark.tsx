import DetailCafeCard from "../../components/cafe/DetailCafeCard";
import { cafeAPI } from "../../api/cafe";
import { Cafe, CafeListApiResponse } from "../../types/datatype";
import { useEffect, useState } from "react";
import Pagination from "../../components/common/Pagination";
import NotFound from "../../components/cafe/NotFound";
import { useNavigate } from "react-router-dom";


export default function Bookmark() {
  const [bookmarkList, setBookmarkList] = useState<Cafe[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  }
  const navigate = useNavigate();
  
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

  useEffect(() => {
    getBookmarkList();
  }, []);

  useEffect(() => {
    cafeAPI.getBookmark(currentPage).then((response) => {
      setBookmarkList(response.data.result.list);
    })
  }, [currentPage])

  // cafeAPI.getBookmark();

  return (
    <div className="w-fit mx-auto pt-10">
      <div className="flex flex-col">
        {bookmarkList.length > 0 && bookmarkList.map((cafe) => (
          <div key={cafe.cafeSeq}>
            <DetailCafeCard {...cafe} />
          </div>
        ))}
        {
          bookmarkList.length == 0 && <NotFound maxHeight="h-[80lvw]" margin="mt-40 mb-20" mainText="아직 카페를 북마크하지 않았어요." labelname="카페 찾으러 가기" handleOnClick={() => navigate('/search')} />
        }
      </div>
        {
          endPage > 1 && 
          <Pagination currentPage={currentPage} endPage={endPage} onPageChange={handlePageChange}/>
        }
    </div>
  );
}
