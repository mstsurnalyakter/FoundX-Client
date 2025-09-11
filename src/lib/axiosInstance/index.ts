import envConfig from "@/src/config";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: envConfig.backendURL,
});


export default axiosInstance