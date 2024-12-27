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
  (config: InternalAxiosRequestConfig) => {
    const method = config.method?.toUpperCase();
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

    if (config.method === "post") {
      console.log("request : post");
    }

    const token = store.getters["auth/token"];
    if (token) {
      if (!config.headers) {
        config.headers = {} as AxiosHeaders;
      }
      (config.headers as AxiosHeaders)["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    store.dispatch("loading/setLoading", false);
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response: AxiosResponse) => {
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
      message.error(response.data.message || "Có lỗi xảy ra!");
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
      message.error(i18n.global.t("error.api.dataNotFound"));
      router.push({ name: "NotFound" });
      return Promise.reject(error);
    }

    if (error.message === "Network Error") {
      message.error(i18n.global.t("error.api.networkError"));
      router.push({ name: "ServerError" });
      return Promise.reject(error);
    }

    if (error.code === "ECONNABORTED" && error.message.includes("timeout")) {
      message.error(i18n.global.t("error.api.timeoutError"));
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
              message.error(i18n.global.t("error.api.sessionExpired"));
              reject(err);
            })
            .finally(() => {
              isRefreshing = false;
            });
        });
      } else {
        message.error(i18n.global.t("error.api.sessionExpired"));
        store.dispatch("auth/logout");
      }
    }
    if (error.response && error.response.data) {
      message.error(error.response.data.message || "Có lỗi xảy ra!");
    }
    return Promise.reject(error);
  }
);

export default Axios;
