import CafeRecommendDiv from "../../components/cafe/CafeRecommendDiv";
import { useEffect, useState } from "react";
import { Cafe } from "../../types/datatype";
import { cafeAPI } from "../../api/cafe";
import { useLoginUserStore } from "../../stores/userStore";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CafeRecommend = () => {
    const [tagCafe, setTagCafe] = useState<Cafe[]>([]);
    const [similarCafe, setSimilarCafe] = useState<Cafe[]>([]);
    const [rateCafe, setRateCafe] = useState<Cafe[]>([]);
    const [myFavoriteCafe, setMyFavoriteCafe] = useState("");
    const store = useLoginUserStore();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!store.loginUser) {
                    Swal.fire({
                        title: "정상적으로 로그인이 되지 않았습니다.",
                        confirmButtonText: "로그인"
                    }).then(() => navigate("/login"))
                } else if (store.loginUser?.preferenceTag.length === 0) {
                    Swal.fire({
                        title: "취향 테스트를 해주세요",
                        text: "내 카페를 찾으려면 취향 테스트에서 하나 이상의 카페를 선택해 주세요.",
                        confirmButtonText: "알겠어요"
                    }).then(() => navigate("/login"))
                } else {
                    const [tagResponse, similarResponse, ratingResponse] = await Promise.all([
                        cafeAPI.getCafeByTag(),
                        cafeAPI.getCafeByInfo(),
                        cafeAPI.getCafeByRating()
                    ]);
    
                    if (tagResponse.data?.list && tagResponse.data.list.length > 0) {
                        setTagCafe(tagResponse.data.list);
                    }
                    if (similarResponse.data?.list && similarResponse.data.list.length > 0) {
                        setSimilarCafe(similarResponse.data.list);
                    }
                    if (ratingResponse.data?.list && ratingResponse.data.list.length > 0) {
                        setMyFavoriteCafe(ratingResponse.data.name);
                        setRateCafe(ratingResponse.data.list);
                    } else {
                        if (ratingResponse.data?.message === "5점을 준 카페가 없습니다") {
                            setMyFavoriteCafe("");
                            setRateCafe([]);
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching cafe data:", error);
            }
        };

        fetchData();
    }, [store.loginUser, navigate]);

    return (
        <div className="m-15 mx-auto w-[80lvw] md:w-[40lvw] lg:w-[40lvw]">
            <h1 className="text-4xl lg:text-5xl text-center text-primary2 p-2 align-middle border-x-4 rounded-lg border-black hover:underline"
             id='test'>당신의 카페 추천</h1>
            {
                tagCafe.length > 0 && (<CafeRecommendDiv title="내 성향과 맞는 카페" CafeList={tagCafe} />)
            }
            {
                tagCafe.length === 0 && <p className="w-full text-center mt-40">내 성향과 맞는 카페가 없습니다.</p>
            }
            {
                similarCafe.length > 0 && (<CafeRecommendDiv title="내 성향과 맞는 카페" CafeList={similarCafe} />)
            }
            {
                similarCafe.length === 0 && <p className="w-full text-center mt-40">나와 비슷한 사용자가 없습니다.</p>
            }
            {
                rateCafe.length > 0 && (<CafeRecommendDiv title={myFavoriteCafe + "와 비슷한 카페"} CafeList={rateCafe} />)
            }
            {
                rateCafe.length === 0 && <p className="w-full text-center mt-40 mb-32">아직 5점을 준 카페가 없습니다.</p>
            }
        </div>
    )
}

export default CafeRecommend;
