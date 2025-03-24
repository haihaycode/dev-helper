import Cookies from "js-cookie";
import { ActionTree } from "vuex";
export interface RouteState {
  previousRoute: string;
  nextRoute: string;
}

const state: RouteState = {
  previousRoute: Cookies.get("previousRoute") || "",
  nextRoute: Cookies.get("nextRoute") || "",
};

const getters = {
  previousRoute: (state: RouteState): string => state.previousRoute,
  nextRoute: (state: RouteState): string => state.nextRoute,
};

// https://typescript-eslint.io/rules/no-explicit-any
const actions: ActionTree<RouteState, any> = {
  setRoutePrevious({ commit }, previousRoute: string): void {
    Cookies.set("previousRoute", previousRoute, { expires: 365 });
    commit("SET_PREVIOUS_ROUTE", previousRoute);
  },
  setRouteNext({ commit }, nextRoute: string): void {
    Cookies.set("nextRoute", nextRoute, { expires: 365 });
    commit("SET_NEXT_ROUTE", nextRoute);
  },
};

const mutations = {
  SET_PREVIOUS_ROUTE(state: RouteState, previousRoute: string): void {
    state.previousRoute = previousRoute;
  },
  SET_NEXT_ROUTE(state: RouteState, nextRoute: string): void {
    state.nextRoute = nextRoute;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
