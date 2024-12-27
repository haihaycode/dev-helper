/* eslint-disable @typescript-eslint/ban-types */
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import router from "@/router";
import { User, AuthState } from "@/models/user";

export interface State extends AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
}

const state: State = {
  token: Cookies.get("tokenU") || null,
  refreshToken: Cookies.get("refreshTokenU") || null,
  user: Cookies.get("userU")
    ? JSON.parse(Cookies.get("userU") as string)
    : null,
};
const getters = {
  token: (state: AuthState): string | null => state.token,
  refreshToken: (state: AuthState): string | null => state.refreshToken,
  user: (state: AuthState): User | null => state.user,
  role: (state: AuthState): string | null => (state.user ? state.user.a : null),
  name: (state: AuthState): string | null => (state.user ? state.user.e : null),
};
const actions = {
  setToken({ commit }: { commit: Function }, token: string): void {
    Cookies.set("tokenU", token, { expires: 1 }); // expires: 1 là 1 ngày
    commit("SET_TOKEN", token);
    const decoded = jwtDecode<User>(token);
    Cookies.set("userU", JSON.stringify(decoded), { expires: 1 });
    commit("SET_USER", decoded);
  },

  setRefreshToken(
    { commit }: { commit: Function },
    refreshToken: string
  ): void {
    Cookies.set("refreshTokenU", refreshToken, { expires: 30 });
    commit("SET_REFRESH_TOKEN", refreshToken);
  },

  logout({ commit }: { commit: Function }): void {
    Cookies.remove("tokenU");
    Cookies.remove("refreshTokenU");
    Cookies.remove("userU");
    commit("LOGOUT");
  },
};
const mutations = {
  SET_TOKEN(state: AuthState, token: string): void {
    state.token = token;
  },

  SET_REFRESH_TOKEN(state: AuthState, refreshToken: string): void {
    state.refreshToken = refreshToken;
  },

  SET_USER(state: AuthState, user: User): void {
    state.user = user;
  },

  LOGOUT(state: AuthState): void {
    state.token = null;
    state.refreshToken = null;
    state.user = null;
    router.push({ name: "login" });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
