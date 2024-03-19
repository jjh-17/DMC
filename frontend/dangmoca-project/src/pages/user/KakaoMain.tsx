import { useEffect } from "react";
import Button from "../../components/common/Button";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function KakaoMain() {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const code = queryParams.get("code");
    axios
      .get("http://localhost:8081/api/account/kakao?code=" + code)
      .then((response) => {
        // TODO : 억세스 토큰을 쿠키에 저장하고, 리프레시 토큰 로칼스토레지에 담으세요.
        // 담은 다음에, 메인 페이지로 유저 정보 가지고 이동 바랍니다.
        const accessToken = response.headers.accesstoken;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className="mx-auto flex flex-col items-center my-20 w-fit max-w-screen-sm gap-2">
      <p id="test">강원에듀체 테스트</p>
      <h1 id="test" className="text-5xl font-extrabold text-primary">
        당모카 DangMoCa
      </h1>
      <h1 id="test" className="text-4xl font-bold text-primary2">
        당모카 DangMoCa
      </h1>
      <h1 id="test" className="text-3xl font-normal text-primary3">
        당모카 DangMoCa
      </h1>
      <h1 id="test" className="text-2xl font-light">
        당모카 DangMoCa
      </h1>
      <h1 id="test" className="text-xl font-black">
        당모카 DangMoCa
      </h1>

      <Button label="로그인테스트" onClick={handleClick} />
    </div>
  );
}
