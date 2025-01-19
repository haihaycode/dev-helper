import store from "@/store";

export function getLoadingGet() {
  return store.getters["loading/isLoadingGet"];
}
export function getLoadingPost() {
  return store.getters["loading/isLoadingPost"];
}
export function getLoadingPut() {
  return store.getters["loading/isLoadingPut"];
}
export function getLoadingDelete() {
  return store.getters["loading/isLoadingDelete"];
}
