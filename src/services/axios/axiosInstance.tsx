import axios, { AxiosInstance } from "axios";

let axiosInstance: AxiosInstance | null = null;

export const getAxiosInstance = (): AxiosInstance => {
  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      timeout: 10000,
      withCredentials: true,  // Giữ true để gửi cookie từ server
    });
  }
  return axiosInstance;
};
