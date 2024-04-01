import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import tokenService from "../utils/token.service";

const SERVER = import.meta.env.VITE_SERVER;

const refreshToken = tokenService.getLocalRefreshToken();

export const defaultAxios: AxiosInstance = axios.create({
  baseURL: SERVER,
});

export const authAxios: AxiosInstance = axios.create({
  baseURL: SERVER,
  headers: {
    Authorization: `Bearer ${tokenService.getCookieAccessToken()}`,
    // "Authorization-refresh": `Bearer ${refreshToken}`,
  },
});

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

authAxios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (!originalRequest) return Promise.reject(error);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const reissueResponse = await axios({
          method: "get",
          url: `${SERVER}/account/reissue`,
          headers: {
            "Authorization-refresh": `Bearer ${refreshToken}`,
          },
        });

        const newAccessToken = reissueResponse.headers.accessToken;
        const newRefreshToken = reissueResponse.headers.refreshToken;

        document.cookie = `accessToken=${newAccessToken}; max-age=3600; path=/;`;
        localStorage.setItem("refreshToken", newRefreshToken);

        axios.defaults.headers.common["Authorization"] =
          "Bearer " + newAccessToken;

        return authAxios(originalRequest);
      } catch (refreshError:any) {
        if (refreshError.response.status === 401){
          localStorage.removeItem("loginUser");
          localStorage.removeItem("refreshToken");
          document.cookie = "accessToken=; Max-Age=0; path=/;";
          window.location.href = "/";
        }

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
