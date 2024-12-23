import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import defaultRoutes from "./modules/defaultRoutes";
import errorRoutes from "./modules/errorRoutes";

const routes: Array<RouteRecordRaw> = [
  ...defaultRoutes,
  ...errorRoutes,
  // ...adminRoutes,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
