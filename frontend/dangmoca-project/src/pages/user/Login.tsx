export default function Login() {

  // 테스트 URL 입력
  const naverURL = '';
  const kakaoURL = import.meta.env.VITE_KAKAO_LOGIN_URL;

  return (
    <>
      <div className="mx-auto text-5xl">로그인 테스트</div>
      <a href={naverURL}>
        <img src="src/assets/icons/naver.png" />
      </a>
      <a href={kakaoURL}>
      <img src="src/assets/icons/kakao.png" />
      </a>
    </>
  )
}
