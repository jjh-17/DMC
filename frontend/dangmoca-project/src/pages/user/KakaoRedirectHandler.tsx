import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLoginUserStore, useTokenStore } from "../../stores/userStore"; 

const KakaoRedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const setAccessToken = useTokenStore((state) => state.setAccessToken);
  const setRefreshToken = useTokenStore((state) => state.setRefreshToken);
  const setLoginUser = useLoginUserStore((state) => state.setLoginUser);

  useEffect(() => {
    const code = queryParams.get("code");
    axios
      .get("http://localhost:8082/api/account/kakao?code=" + code)
      .then((response) => {
        const accessToken = response.headers.accesstoken;
        const refreshToken = response.headers.refreshtoken;

        console.log(accessToken);
        console.log(refreshToken);
        console.log(response.data);

        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setLoginUser(response.data.result);

        document.cookie = `accessToken=${accessToken}; max-age=3600; path=/;`;
        localStorage.setItem("refreshToken", refreshToken);

        navigate("/");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [navigate, setAccessToken, setRefreshToken]);

  return null;
}

export default KakaoRedirectHandler;