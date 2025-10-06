import envConfig from "@/src/config";
import { getNewAccessToken } from "@/src/services/AuthService";
import axios from "axios";
import { cookies } from "next/headers";

const axiosInstance = axios.create({
  baseURL: envConfig.backendURL,
});


axiosInstance.interceptors.request.use(
  async function (config) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(function onFulfilled(response) {
  return response;
},
  async function onRejected(error) {
    const config = error?.config
    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;
      const res = await getNewAccessToken();
      const accessToken = res?.data?.accessToken;
      config.headers["Authorization"] = accessToken;
      const cookieStore = await cookies()
      cookieStore.set("accessToken", accessToken);
      return axiosInstance(config);
    }else{
      return Promise.reject(error);
    }
});


export default axiosInstance