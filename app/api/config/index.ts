import axios from "axios";

const ORDINALS_API_URL: string = process.env.ORDINALSBOT_API_URL || "";
const ORDINALS_API_KEY: string = process.env.ORDINALSBOT_API_KEY || "";

const axiosInstance = axios.create({
  baseURL: ORDINALS_API_URL,
  headers: {
    "x-api-key": ORDINALS_API_KEY,
  },
});

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Axios Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
