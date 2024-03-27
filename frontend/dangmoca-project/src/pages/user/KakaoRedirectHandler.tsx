import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTokenStore } from "../../stores/userStore"; 

const KakaoRedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const setAccessToken = useTokenStore((state) => state.setAccessToken);
  const setRefreshToken = useTokenStore((state) => state.setRefreshToken);

  useEffect(() => {
    const code = queryParams.get("code");
    axios
      .get("http://localhost:8082/api/account/kakao?code=" + code)
      .then((response) => {
        // TODO : 억세스 토큰을 쿠키에 저장하고, 리프레시 토큰 로칼스토레지에 담으세요.
        // 담은 다음에, 메인 페이지로 유저 정보 가지고 이동 바랍니다.
        // const accessToken = response.headers.accesstoken;

        const accessToken = response.headers.accesstoken;
        const refreshToken = response.headers.refreshtoken;

        console.log(accessToken);
        console.log(refreshToken);
        console.log(response.data);

        setAccessToken(accessToken);
        setRefreshToken(refreshToken);

        document.cookie = `accessToken=${accessToken}; max-age=3600; path=/;`;
        localStorage.setItem("refreshToken", refreshToken);

        navigate("/");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return null;
}

export default KakaoRedirectHandler;