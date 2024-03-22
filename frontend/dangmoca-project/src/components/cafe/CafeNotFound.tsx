export default function CafeNotFound() {
    return (
        <div className="pb-10">
            <div className="m-4 w-[80lvw] h-[80lvw] md:w-[40lvw] md:h-[40lvw] flex flex-col justify-center bg-[url(/src/assets/pictures/coffee-sleep.jpg)] bg-contain" >
                <div className="text-center">
                    {/* <img src="/src/assets/pictures/coffee-sleep.jpg" className="mb-4" /> */}
                    <h1 id="test" className="text-4xl lg:text-xl align-middle text-white mb-2">검색 결과가 없습니다.</h1>
                    <p id="test" className="text-xl lg:text-base align-middle">다른 검색을 시도해 보세요</p>
                </div>
            </div>
        </div>
    )
}
