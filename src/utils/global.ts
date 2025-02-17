import { User } from "@/models/user";
import store from "@/store";

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
