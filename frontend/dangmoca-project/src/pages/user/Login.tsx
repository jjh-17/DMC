export default function Login() {
  // 테스트 URL 입력
  const naverURL = "";
  const kakaoLoginURL = "";

  return (
    <>
      <div className="mx-auto text-5xl">로그인 테스트</div>
      <a href={naverURL}>
        <img src="src/assets/icons/naver.png" />
      </a>
      <a href={kakaoLoginURL}>
        <img src="src/assets/icons/kakao.png" />
      </a>
    </>
  );
}
