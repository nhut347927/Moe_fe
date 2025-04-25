import axios, { AxiosInstance } from "axios";
import { ENV } from "@/common/config/env";
let axiosInstance: AxiosInstance | null = null;

export const getAxiosInstance = (): AxiosInstance => {
  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL: ENV.API_BASE_URL,
      timeout: 60000,
      withCredentials: true,
    });
  }
  return axiosInstance;
};
