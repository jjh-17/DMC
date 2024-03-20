import axios, { AxiosInstance } from "axios";
// import tokenService from "../utils/token.service"

const SERVER = import.meta.env.VITE_SERVER

export const authAxios:AxiosInstance = axios.create({
    baseURL: SERVER,
    // headers: {
    //     Authorization: 'Bearer ' + tokenservice.getLocalAccessToken()
    // },
});

// response의 refresh token, access token 등 관리
authAxios.interceptors.response.use(
    res => res,
    err => {
      console.log(err.response.status);
    },
);

export const defaultAxios:AxiosInstance = axios.create({
    baseURL: SERVER,

});