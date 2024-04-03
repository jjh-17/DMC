import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import tokenService from "../utils/token.service";
import Swal from "sweetalert2";

const SERVER = import.meta.env.VITE_SERVER;

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

authAxios.interceptors.request.use(
  function (config) {
    const accessToken = tokenService.getCookieAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

authAxios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    console.log(tokenService.getCookieAccessToken());
    console.log(tokenService.getLocalRefreshToken());

    if (!originalRequest) return Promise.reject(error);

    if (!originalRequest.headers) {
      originalRequest.headers = {};
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const reissueResponse = await axios({
          method: "get",
          url: `${SERVER}/account/reissue`,
          headers: {
            "Authorization-refresh": `Bearer ${tokenService.getLocalRefreshToken()}`,
          },
        });

        console.log(reissueResponse);

        const newAccessToken = reissueResponse.headers.accesstoken;
        const newRefreshToken = reissueResponse.headers.refreshtoken;

        console.log(newAccessToken);
        console.log(newRefreshToken);

        document.cookie = `accessToken=${newAccessToken}; max-age=3600; path=/;`;
        localStorage.setItem("refreshToken", newRefreshToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return authAxios(originalRequest);
      } catch (refreshError: any) {
        Swal.fire({
          title: "로그인 만료!",
          icon: "error",
        }).then((result) => {
          if (result.isConfirmed) {
            console.log(refreshError.response.data);

            localStorage.removeItem("loginUser");
            localStorage.removeItem("refreshToken");
            document.cookie = "accessToken=; Max-Age=0; path=/;";
            window.location.href = "/";
          }
        });

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
