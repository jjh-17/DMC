import Button from "../common/Button";

export default function NotFound({maxHeight, margin, mainText, labelname, handleOnClick} : {maxHeight:string, margin:string, mainText:string, labelname:string, handleOnClick:()=>void}) {
    return (
        <div className="pb-10">
            <div className={`m-4 w-[80lvw] ${maxHeight} md:w-[40lvw] md:h-[30lvw] flex flex-col justify-center`} >
                <div className="text-center">
                    <h1 id="test" className={`text-3xl lg:text-4xl align-middle ${margin}`}>{mainText}</h1>
                    <Button label={labelname} addClass="text-2xl" onClick={handleOnClick}/>
                </div>
            </div>
        </div>
    )
}
// h-[80lvw]
// mt-40 mb-20
// 아직 카페를 북마크하지 않았어요.
// 카페 찾으러 가기
// () => navigate('/search')