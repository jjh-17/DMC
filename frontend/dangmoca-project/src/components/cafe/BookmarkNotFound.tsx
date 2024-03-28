import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

export default function BookmarkNotFound() {
    const navigate = useNavigate();
    return (
        <div className="pb-10">
            <div className="m-4 w-[80lvw] h-[80lvw] md:w-[40lvw] md:h-[40lvw] flex flex-col justify-center bg-[url(/src/assets/pictures/coffee-sleep.jpg)] bg-contain" >
                <div className="text-center">
                    <h1 id="test" className="text-4xl lg:text-6xl align-middle text-white mb-2">아직 카페를 북마크하지 않았어요.</h1>
                    <p id="test" className="text-xl lg:text-4xl align-middle">카페를 찾아봐요</p>
                    <Button label="카페 찾기" onClick={() => navigate('/search')}/>
                </div>
            </div>
        </div>
    )
}
