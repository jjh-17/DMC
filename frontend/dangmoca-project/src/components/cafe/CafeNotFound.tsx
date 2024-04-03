import SadCoffeeUrl from '../../assets/pictures/sadcoffee.png'

export default function CafeNotFound() {
    return (
        <div className="pb-10">
            <div className="m-4 w-[80lvw] h-[80lvw] md:w-[40lvw] md:h-[40lvw] flex flex-col justify-center" >
                <div className="text-center flex-col items-center">
                    <h1 id="test" className="text-4xl lg:text-6xl align-middle mb-2">검색 결과가 없습니다.</h1>
                    <p id="test" className="text-xl lg:text-4xl align-middle">다른 검색을 시도해 보세요</p>
                    <img src={SadCoffeeUrl} className="inline-block my-5"/>
                </div>
            </div>
        </div>
    )
}
