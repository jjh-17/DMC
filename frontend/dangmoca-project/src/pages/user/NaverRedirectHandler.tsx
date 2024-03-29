import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLoginUserStore, useTokenStore } from "../../stores/userStore"; 

const NaverRedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const setAccessToken = useTokenStore((state) => state.setAccessToken);
  const setRefreshToken = useTokenStore((state) => state.setRefreshToken);
  const setLoginUser = useLoginUserStore((state) => state.setLoginUser);

  useEffect(() => {
    const code = queryParams.get("code");
    axios
      .get("http://localhost:8082/api/account/naver?code=" + code)
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
};

export default NaverRedirectHandler;


// import { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// // import useUserStore from "../../stores/userStore";

// // import {User} from "../../stores/userStore";

// const NaverRedirectHandler = () => {
//   const navigate = useNavigate();

//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);

//   // const { user, setUser } = useUserStore();

//   // setUser({id:3, name:"조", accessToken:"1", refreshToken:"2" });
//   // console.log(user.id);
  

//   useEffect(() => {
//     const code = queryParams.get("code");
//     axios
//       .get("http://localhost:8082/api/account/naver?code=" + code)
//       .then((response) => {
//         // TODO : 억세스 토큰을 쿠키에 저장하고, 리프레시 토큰 로칼스토레지에 담으세요.
//         // 담은 다음에, 메인 페이지로 유저 정보 가지고 이동 바랍니다.
//         // const accessToken = response.headers.accesstoken;

//         const accessToken = response.headers.accesstoken;
//         document.cookie = `accessToken=${accessToken}; max-age=3600; path=/;`;

//         // 리프레시 토큰을 로컬 스토리지에 저장 (서버 응답에 따라 리프레시 토큰 키가 달라질 수 있음)
//         const refreshToken = response.headers.refreshtoken; // 가정
//         localStorage.setItem("refreshToken", refreshToken);

//         // setUser((prevUser:User) => ({
//         //   ...prevUser,
//         //   accessToken: accessToken,
//         //   refreshToken: refreshToken
//         // }));

//         // 메인 페이지로 리디렉션
//         navigate("/");
//         console.log(accessToken);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   return null;
// };

// export default NaverRedirectHandler;
