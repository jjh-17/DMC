import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

export default function BookmarkNotFound() {
    const navigate = useNavigate();
    return (
        <div className="pb-10">
            <div className="m-4 w-[80lvw] h-[80lvw] md:w-[40lvw] md:h-[40lvw] flex flex-col justify-center" >
                <div className="text-center">
                    <h1 id="test" className="text-3xl lg:text-4xl align-middle mb-20">아직 카페를 북마크하지 않았어요.</h1>
                    <Button label="카페 찾으러 가기" addClass="text-2xl" onClick={() => navigate('/search')}/>
                </div>
            </div>
        </div>
    )
}
