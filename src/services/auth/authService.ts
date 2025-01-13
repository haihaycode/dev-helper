import { useStore } from "vuex";
const store = useStore();
export const setToken = (accessToken: string, refreshToken: string) => {
  store.dispatch("auth/setToken", accessToken);
  store.dispatch("auth/setRefreshToken", refreshToken);
};

export const getToken = () => {
  return store.getters["auth/token"];
};
export const getRefreshToken = () => {
  return store.getters["auth/refreshToken"];
};
export const getUser = () => {
  return store.getters["auth/user"];
};
export const logout = () => {
  store.dispatch("auth/logout");
};
