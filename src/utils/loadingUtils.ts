import store from "@/store";

export const getLoadingGet = (): boolean => {
  return store.getters["loading/isLoadingGet"];
};
export const getLoadingPost = (): boolean => {
  return store.getters["loading/isLoadingPost"];
};

export const getLoadingPut = (): boolean => {
  return store.getters["loading/isLoadingPut"];
};
export const getLoadingDelete = (): boolean => {
  return store.getters["loading/isLoadingDelete"];
};
