/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from "axios";
import { MAX_TIME_OUT, HOST, SUCCESS_CODE } from "@/api/config";
import store from "@/store";
import { message } from "ant-design-vue";
import router from "@/router";
import i18n from "@/services/i18n";
import { getAccessToken } from "@/utils/global";
import { notification } from "ant-design-vue";

interface AxiosRequestConfig extends InternalAxiosRequestConfig {
  loading?: boolean;
  authenticate?: boolean;
}
interface AxiosResponseConfig extends AxiosResponse {
  config: AxiosRequestConfig;
}
const Axios: AxiosInstance = axios.create({
  baseURL: HOST,
  timeout: MAX_TIME_OUT,
  responseType: "json",
  withCredentials: false,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string | null) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

Axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const method = config.method?.toUpperCase();
    if (config.loading !== undefined ? config.loading : true) {
      switch (method) {
        case "GET":
          store.dispatch("loading/setLoadingGet", true);
          break;
        case "POST":
          store.dispatch("loading/setLoadingPost", true);
          break;
        case "PUT":
          store.dispatch("loading/setLoadingPut", true);
          break;
        case "DELETE":
          store.dispatch("loading/setLoadingDelete", true);
          break;
        case "PATCH":
          store.dispatch("loading/setLoadingPatch", true);
          break;
        default:
          break;
      }
    }
    const token = getAccessToken();
    if (
      token && config.authenticate !== undefined ? config.authenticate : true
    ) {
      if (!config.headers) {
        config.headers = {} as AxiosHeaders;
      }
      (config.headers as AxiosHeaders)["Authorization"] = `Bearer ${token}`;
    }
    const locale = store.getters["locale/locale"];
    (config.headers as AxiosHeaders)["Accept-Language"] = locale || "en";
    return config;
  },
  (error: any) => {
    store.dispatch("loading/setLoading", false);
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response: AxiosResponseConfig) => {
    const method = response.config.method?.toUpperCase();
    switch (method) {
      case "GET":
        store.dispatch("loading/setLoadingGet", false);
        break;
      case "POST":
        store.dispatch("loading/setLoadingPost", false);
        break;
      case "PUT":
        store.dispatch("loading/setLoadingPut", false);
        break;
      case "DELETE":
        store.dispatch("loading/setLoadingDelete", false);
        break;
      case "PATCH":
        store.dispatch("loading/setLoadingPatch", false);
        break;
      default:
        break;
    }
    if (response.status === SUCCESS_CODE) {
      return response;
    } else {
      message.error(response.data.message || i18n.global.t("message.error"));
      return Promise.reject(response);
    }
  },
  async (error: any) => {
    const originalRequest = error.config;
    const method = originalRequest.method?.toUpperCase();
    switch (method) {
      case "GET":
        store.dispatch("loading/setLoadingGet", false);
        break;
      case "POST":
        store.dispatch("loading/setLoadingPost", false);
        break;
      case "PUT":
        store.dispatch("loading/setLoadingPut", false);
        break;
      case "DELETE":
        store.dispatch("loading/setLoadingDelete", false);
        break;
      case "PATCH":
        store.dispatch("loading/setLoadingPatch", false);
        break;
      default:
        break;
    }

    if (error.response && error.response.status === 404) {
      notification.error({
        message: i18n.global.t("error.api.dataNotFound"),
        description: "The page you are looking for does not exist.",
      });
      router.push({ name: "NotFound" });
      return Promise.reject(error);
    }

    if (error.message === "Network Error") {
      notification.error({
        message: i18n.global.t("error.api.networkError"),
        description: "The page you are looking for does not exist.",
      });
      router.push({ name: "ServerError" });
      return Promise.reject(error);
    }

    if (error.code === "ECONNABORTED" && error.message.includes("timeout")) {
      notification.error({
        message: i18n.global.t("error.api.timeoutError"),
        description: "The page you are looking for does not exist.",
      });
      router.push({ name: "ServerError" });
      return Promise.reject(error);
    }

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (store.getters["auth/refreshToken"]) {
        if (isRefreshing) {
          try {
            const token = await new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            });
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return await Axios(originalRequest);
          } catch (err) {
            return await Promise.reject(err);
          }
        }
        originalRequest._retry = true;
        isRefreshing = true;
        return new Promise((resolve, reject) => {
          Axios.post("/api/public/refresh", {
            refreshToken: store.getters["auth/refreshToken"],
          })
            .then((response: AxiosResponse<{ token: string }>) => {
              const { data } = response;
              store.dispatch("auth/setToken", data.token);
              Axios.defaults.headers.common["Authorization"] =
                "Bearer " + data.token;
              processQueue(null, data.token);
              resolve(Axios(originalRequest));
            })
            .catch((err: Error) => {
              processQueue(err, null);
              store.dispatch("auth/logout");
              notification.error({
                message: i18n.global.t("error.api.sessionExpired"),
                description: "The page you are looking for does not exist.",
              });
              reject(err);
            })
            .finally(() => {
              isRefreshing = false;
            });
        });
      } else {
        notification.error({
          message: i18n.global.t("error.api.sessionExpired"),
          description: "The page you are looking for does not exist.",
        });
        store.dispatch("auth/logout");
      }
    }
    if (error.response && error.response.data) {
      notification.error({
        message: error.response.data.message || "Có lỗi xảy ra!",
        description: "The page you are looking for does not exist.",
      });
    }
    return Promise.reject(error);
  }
);
export default Axios;
