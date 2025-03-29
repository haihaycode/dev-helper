import { User } from "@/models/user";
import store from "@/store";

export const PAGE_SIZE_DEFALT = 10;
export const PAGE_FIRST = 1;
export const QUERY_DEFAUlT = "";
export const ORDER_BY = {
  COLUMN_DEFAULT: "id",
  ORDER_DEFAULT: "desc",
};
export const IS_DELETED = {
  is_Irue: true,
  is_False: false,
};

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
