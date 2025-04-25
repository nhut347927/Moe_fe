import { AxiosError, AxiosRequestConfig } from "axios";
import { getAxiosInstance } from "./axios-instance";

const axiosInstance = getAxiosInstance();

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 999 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Gửi lại yêu cầu ban đầu
        return axiosInstance(originalRequest);
      } catch (retryError) {
        // Dùng `window.location` để điều hướng đến trang đăng nhập
        window.location.href = "/login";
        return Promise.reject(retryError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
