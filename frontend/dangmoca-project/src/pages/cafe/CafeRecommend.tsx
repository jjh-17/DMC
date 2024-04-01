import CafeRecommendDiv from "../../components/cafe/CafeRecommendDiv";
import { useEffect, useState } from "react";
import { Cafe } from "../../types/datatype";
import { cafeAPI } from "../../api/cafe";
import { useLoginUserStore } from "../../stores/userStore";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CafeRecommend = () => {
    // mount시 세개의 api 호출해서 세개의 데이터를 각각 받아올 예정
    const [tagCafe, setTagCafe] = useState<Cafe[]>([]);
    const [similarCafe, setSimilarCafe] = useState<Cafe[]>([]);
    const [rateCafe, setRateCafe] = useState<Cafe[]>([]);
    const [myFavoriteCafe, setMyFavoriteCafe] = useState("");
    const store = useLoginUserStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.loginUser?.preferenceTag || store.loginUser?.preferenceTag.length == 0) {
            Swal.fire({
                title: "내 카페를 찾으려면 취향 테스트를 먼저 해주세요.",
                confirmButtonText: "알겠어요"
            }).then(() => navigate("/cafetest"))
        }

        cafeAPI.getCafeByTag().then((response) => {
            if (response.data?.list) if (response.data.list.length > 0) {
                setTagCafe(response.data.list);
            }
            else {
                setTagCafe([]);
            }
        })
        cafeAPI.getCafeByInfo().then((response) => {
            if (response.data?.list) if (response.data.list.length > 0) {
                setSimilarCafe(response.data.list);
            }
            else {
                setSimilarCafe([]);
            }
        })
        cafeAPI.getCafeByRating().then((response) => {
            if (response.data?.list) if (response.data.list.length > 0) {
                setMyFavoriteCafe(response.data.name);
                setRateCafe(response.data.list);
            }
            else {
                if (response.data.message == "5점을 준 카페가 없습니다") {
                    setMyFavoriteCafe("");
                    setRateCafe([]);
                }
            }
        })
    }, [])

    return (
        <div className="m-15 mx-auto w-[80lvw] md:w-[40lvw] lg:w-[40lvw]">
            <h1 className="text-4xl lg:text-5xl text-center text-primary2 p-2 align-middle border-x-4 rounded-lg border-black hover:underline"
             id='test'>당신의 카페 추천</h1>
            {
                tagCafe.length > 0 && (<CafeRecommendDiv title="내 성향과 맞는 카페" CafeList={tagCafe} />)
            }
            {
                tagCafe.length == 0 && <p className="w-full text-center h-40">선택한 태그가 없습니다.</p>
            }
            {
                similarCafe.length > 0 && (<CafeRecommendDiv title="내 성향과 맞는 카페" CafeList={similarCafe} />)
            }
            {
                similarCafe.length == 0 && <p>나와 비슷한 사용자가 없습니다.</p>
            }
            {
                rateCafe.length > 0 && (<CafeRecommendDiv title={myFavoriteCafe + "와 비슷한 카페"} CafeList={rateCafe} />)
            }
            {
                rateCafe.length == 0 && <p>아직 5점을 준 카페가 없습니다.</p>
            }
        </div>
    )
}

export default CafeRecommend;