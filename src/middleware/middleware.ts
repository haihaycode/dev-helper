import { User } from "@/models/user";
import store from "@/store";
import { setNextRoute } from "@/utils/routeUtils";
import { setPreviousRoute } from "@/utils/routeUtils";
import { RouteLocationNormalized } from "vue-router";

export default function middleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: (to?: string | object | RouteLocationNormalized) => void
) {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    setPreviousRoute(to.fullPath);
    setNextRoute(from.fullPath);
    next({ name: "LoginPage" });
  } else {
    next();
  }
}

const isAuthenticated = () => {
  const token = store.getters["auth/token"];
  const user: User = store.getters["auth/user"];
  if (token && user) {
    return true;
  }
  return false;
};
