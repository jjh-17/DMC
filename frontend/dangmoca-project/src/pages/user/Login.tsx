import Logo from '../../assets/icons/logo1.svg?react'

export default function Login() {
  const naverURL = import.meta.env.VITE_NAVER_LOGIN_URL;
  const kakaoURL = import.meta.env.VITE_KAKAO_LOGIN_URL;
  const linkClassName = "flex flex-row gap-4 p-2 items-center rounded-md shadow-lg mt-4 text-lg lg:text-2xl"

  return (
    <div className="flex flex-col mx-auto w-fit">
      <Logo className='w-full mb-12' />
      <a href={naverURL}
        className={linkClassName}
      >
        <img
          src="src/assets/icons/naver.png"
          alt="Naver 로그인"
          className='w-12 h-12 md:w-20 md:h-20'
        />
        <p id="test">네이버로 시작하기</p>
      </a>
      <a href={kakaoURL}
        className={linkClassName}
      >
        <img
          src="src/assets/icons/kakao.png"
          alt="Kakao 로그인"
          className='w-12 h-12 md:w-20 md:h-20'
        />
        <p id="test">카카오로 시작하기</p>
      </a>
    </div>
  );
}
