import store from "@/store";

export const getPreviousRoute = () => {
  return store.getters["route/previousRoute"];
};

export const getNextRoute = () => {
  return store.getters["route/nextRoute"];
};

export const setPreviousRoute = (previousRoute: string) => {
  store.dispatch("route/setRoutePrevious", previousRoute);
};

export const setNextRoute = (nextRoute: string) => {
  store.dispatch("route/setRouteNext", nextRoute);
};
