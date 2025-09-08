import envConfig from "@/src/config";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: envConfig.backendUrl,
});


export default axiosInstance