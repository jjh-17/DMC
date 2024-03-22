import { Component } from 'react';

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

class TokenService extends Component {
  getLocalRefreshToken = () => {
    return localStorage.getItem('user') ? localStorage.getItem('refresh-token') : null;
  };

  getLocalAccessToken = () => {
    return localStorage.getItem('user') ? localStorage.getItem('token') : null;
  };

  setLocalRefreshToken = (token: string) => {
    localStorage.setItem('refresh-token', token);
  };

  setLocalAccessToken = (token: string) => {
    localStorage.setItem('token', token);
  };

  updateLocalAccessToken = (token: string) => {
    localStorage.setItem('token', token);
  };

  
  removeUser = () => {
    localStorage.removeItem('token');
    try {
      localStorage.removeItem('refresh-token');
    } catch(err) {
        console.log(err)
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
