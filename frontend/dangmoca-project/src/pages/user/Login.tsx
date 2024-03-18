import Logo from '../../assets/icons/coffeebean.svg?react'

export default function Login() {
  // 테스트 URL 입력

  const naverURL = "";
  const kakaoLoginURL = import.meta.env.VITE_KAKAO_LOGIN_URL;

  return (
    <div className="flex flex-col max-w-4xl">
      <div className="mx-auto text-5xl">DangMoCa</div>
      
      <div className="w-1/2 max-w-xs mx-auto"> {/* 로고의 최대 크기를 지정합니다. */}
        <Logo className='w-full h-auto'/> {/* 너비를 100%로 설정하고, 높이는 자동으로 조절되도록 해서 비율을 유지합니다. */}
      </div>
      <div className="mx-auto">
        <a href={naverURL}>
          <img src="src/assets/icons/naver.png" />
        </a>
        <a href={kakaoLoginURL}>
          <img src="src/assets/icons/kakao.png" />
        </a>
      </div>
    </div>
  );
}
