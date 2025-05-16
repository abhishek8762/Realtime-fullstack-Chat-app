import axios from "axios";

const change =
  import.meta.NODE_ENV === "production"
    ? import.meta.env.VITE_API_URL
    : "http://localhost:5001";

export const axiosInstance = axios.create({
  baseURL: change,
  withCredentials: true,
});
