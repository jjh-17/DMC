import Logo from "../../assets/icons/coffeebean.svg?react";

export default function Login() {
  // 테스트 URL 입력

  const naverURL = import.meta.env.VITE_NAVER_LOGIN_URL;
  const kakaoLoginURL = import.meta.env.VITE_KAKAO_LOGIN_URL;

  return (
    <div className="flex flex-col max-w-4xl">
      <div className="mx-auto text-5xl">DangMoCa</div>

      <div className="w-1/2 max-w-xs mx-auto my-8">
        <Logo className="w-full h-auto" />
      </div>
      <div className="mx-auto text-4xl mb-8">로그인 하기</div>
      <div className="flex justify-center space-x-16">
        <a href={naverURL} className="w-24 h-24">
          <img
            src="src/assets/icons/naver.png"
            alt="Naver 로그인"
            className="w-full h-full object-contain"
          />
        </a>
        <a href={kakaoLoginURL} className="w-24 h-24">
          <img
            src="src/assets/icons/kakao.png"
            alt="Kakao 로그인"
            className="w-full h-full object-contain"
          />
        </a>
      </div>
    </div>
  );
}
