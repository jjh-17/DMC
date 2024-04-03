import LoadingIcon from '../../assets/icons/loading.svg?react'
import Logo from '../../assets/icons/logo1.svg'

export default function CafeLoading() {
    return (
        <div className="pb-10">
            <div className="h-[322px]  m-4 flex flex-col items-center justify-center">
                <div className="text-center animate-pulse">
                    <img src={Logo} className="mb-4" />
                    <span id="test" className="text-lg lg:text-xl align-middle">카페를 불러오고 있어요  <LoadingIcon className="w-6 h-6 lg:w-10 lg:h-10 inline-block animate-spin" /> </span>
                </div>
            </div>
        </div>
    )
}
