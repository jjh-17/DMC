import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import tokenService from "../utils/token.service";
import { useTokenStore } from "../stores/userStore";

const SERVER = import.meta.env.VITE_SERVER;

const refreshToken = useTokenStore;

const setAccessToken = useTokenStore((state) => state.setAccessToken);
const setRefreshToken = useTokenStore((state) => state.setRefreshToken);

export const defaultAxios: AxiosInstance = axios.create({
  baseURL: SERVER,
});

export const authAxios: AxiosInstance = axios.create({
  baseURL: SERVER,
  headers: {
    Authorization: `Bearer ${tokenService.getLocalAccessToken()}`,
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

        const newAccessToken = reissueResponse.headers.accesstoken;
        const newRefreshToken = reissueResponse.headers.refreshtoken;

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);

        document.cookie = `accessToken=${newAccessToken}; max-age=3600; path=/;`;
        localStorage.setItem("refreshToken", newRefreshToken);

        axios.defaults.headers.common["Authorization"] =
          "Bearer " + newAccessToken;

        return authAxios(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
