import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import defaultRoutes from "./modules/defaultRoutes";
import errorRoutes from "./modules/errorRoutes";
import basePages from "./modules/baseRoutes";
import toolsRoutes from "./modules/toolsRoutes";

const routes: Array<RouteRecordRaw> = [
  ...defaultRoutes,
  ...errorRoutes,
  ...basePages,
  ...toolsRoutes,
  // ...adminRoutes,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
