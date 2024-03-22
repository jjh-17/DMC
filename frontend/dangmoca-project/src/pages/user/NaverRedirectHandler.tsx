import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useUserStore from "../../stores/userStore";

const NaverRedirectHandler = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [ userState, setUserState ] = useUserStore();

  console.log(userState.user);
  setUserState({id:3, name:"조" });

  useEffect(() => {
    const code = queryParams.get("code");
    axios
      .get("http://localhost:8082/api/account/naver?code=" + code)
      .then((response) => {
        // TODO : 억세스 토큰을 쿠키에 저장하고, 리프레시 토큰 로칼스토레지에 담으세요.
        // 담은 다음에, 메인 페이지로 유저 정보 가지고 이동 바랍니다.
        // const accessToken = response.headers.accesstoken;

        const accessToken = response.headers.accesstoken;
        document.cookie = `accessToken=${accessToken}; max-age=3600; path=/;`;

        // 리프레시 토큰을 로컬 스토리지에 저장 (서버 응답에 따라 리프레시 토큰 키가 달라질 수 있음)
        const refreshToken = response.headers.refreshtoken; // 가정
        localStorage.setItem("refreshToken", refreshToken);

        // 메인 페이지로 리디렉션
        navigate("/");
        console.log(accessToken);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return null;
};

export default NaverRedirectHandler;
