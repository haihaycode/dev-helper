import { User } from "@/models/user";
import store from "@/store";
import i18n from "@/services/i18n";

export const PAGE_SIZE_DEFALT = 10;
export const PAGE_FIRST = 1;
export const QUERY_DEFAUlT = "";
export const ORDER_BY = {
  COLUMN_DEFAULT: "id",
  ORDER_DEFAULT: "desc",
};

// export const messageConfig = message.config({
//   top: "100px",
//   duration: 2,
//   maxCount: 3,
//   prefixCls: "my-message",
// });

export const IS_DELETED = {
  is_Irue: true,
  is_False: false,
};
export const EXPIRES_TOKEN = 1;

export const SCROLL_TO = {
  TOP: () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
  BOTTOM: () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  },
};

export function loadCookie(name: string) {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));
  return cookie ? cookie.split("=")[1] : null;
}

export function saveCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/`;
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function getLanguage() {
  const language = loadCookie("locale");
  return language ? language : "en";
}

export function setLanguage(language: string) {
  saveCookie("locale", language);
}

export function getAccessToken() {
  return store.getters["auth/token"];
}

export function setAccessToken(token: string) {
  store.dispatch("auth/setToken", token);
}

export function getRefreshToken() {
  return store.getters["auth/refreshToken"];
}

export function setRefreshToken(token: string) {
  store.dispatch("auth/setRefreshToken", token);
}

export function getUser() {
  return store.getters["auth/user"];
}

export function setUser(user: User) {
  store.dispatch("auth/setUser", user);
}
export const translate = (p0: string) => {
  return i18n.global.t(p0);
};

export const getLocale = (): string => {
  return store.getters["locale/locale"];
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        resolve(reader.result as string);
      }
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const encodeData = (data: any): string => {
  return btoa(JSON.stringify(data));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const decodeData = (encodedData: string): any => {
  return JSON.parse(atob(encodedData));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveToLocalStorage = (key: string, data: any) => {
  const encodedData = encodeData(data);
  localStorage.setItem(key, encodedData);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getFromLocalStorage = (key: string): any => {
  const encodedData = localStorage.getItem(key);
  if (encodedData) {
    return decodeData(encodedData);
  }
  return null;
};
