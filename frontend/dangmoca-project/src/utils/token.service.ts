// 예시임 바꿔도됨
// localstorage에 토큰 저장 및 관리
// const parseJwt = (token: string) => {
//   const base64Url = token.split('.')[1];
//   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//   const jsonPayload = decodeURIComponent(
//     atob(base64)
//       .split('')
//       .map(function (c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//       })
//       .join('')
//   );
//   return JSON.parse(jsonPayload);
// };

class TokenService {
  static getLocalRefreshToken = () => {
    return localStorage.getItem("refreshToken")
      ? localStorage.getItem("refreshToken")
      : null;
  };

  static getCookieAccessToken = () => {
    let cookieArray = document.cookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      let cookiePair = cookieArray[i].split("=");
      if ("accessToken" == cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }
    return null;
    // return localStorage.getItem("loginUser")
    //   ? localStorage.getItem("token")
    //   : null;
  };

  static setLocalRefreshToken = (token: string) => {
    localStorage.setItem("refreshToken", token);
  };

  static setLocalAccessToken = (token: string) => {
    localStorage.setItem("token", token);
  };

  static updateLocalAccessToken = (token: string) => {
    localStorage.setItem("token", token);
  };

  static removeUser = () => {
    localStorage.removeItem("token");
    try {
      localStorage.removeItem("refresh-token");
    } catch (err) {
      console.log(err);
    }
  };

  // expiredToken = () => {
  //   try {
  //     return parseJwt(this.getLocalAccessToken()).exp * 1000 <= Date.now();
  //   } catch {
  //     return false;
  //   }
  // };
}

export default TokenService;
