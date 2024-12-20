import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import defaultRoutes from "./modules/defaultRoutes";
// import adminRoutes from "./adminRoutes";

const routes: Array<RouteRecordRaw> = [
  ...defaultRoutes,
  // ...adminRoutes,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
