import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLoginUserStore } from "../../stores/userStore";

const SERVER = import.meta.env.VITE_SERVER;

const NaverRedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const setLoginUser = useLoginUserStore((state) => state.setLoginUser);

  useEffect(() => {
    const code = queryParams.get("code");
    axios
    .get(SERVER + "/account/naver?code=" + code)
    .then((response) => {
        console.log(response.headers);

        const accessToken = response.headers.accesstoken;
        const refreshToken = response.headers.refreshtoken;

        console.log(accessToken);
        console.log(refreshToken);
        console.log(response.data);

        if (response.status === 200) {
          setLoginUser(response.data.result);

          document.cookie = `accessToken=${accessToken}; max-age=3600; path=/;`;
          localStorage.setItem("refreshToken", refreshToken);
        }

        navigate("/");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [navigate]);

  return <p>네이버</p>;
};

export default NaverRedirectHandler;
