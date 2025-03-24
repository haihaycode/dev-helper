/* eslint-disable @typescript-eslint/no-explicit-any */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import defaultRoutes from "./modules/defaultRoutes";
import errorRoutes from "./modules/errorRoutes";
import basePages from "./modules/baseRoutes";
import toolsRoutes from "./modules/toolsRoutes";
import accountRoutes from "./modules/accountRoutes";
import middleware from "@/middleware/middleware";

const routes: Array<RouteRecordRaw> = [
  ...defaultRoutes,
  ...errorRoutes,
  ...basePages,
  ...toolsRoutes,
  ...accountRoutes,
  // ...adminRoutes,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  middleware(to, from, next);
});

router.afterEach((to, from) => {
  console.log("to", to);
  console.log("from", from);
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title as string;
  }

  Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(
    (el) => el.parentNode?.removeChild(el)
  );
  if (!nearestWithMeta) return;
  (nearestWithMeta.meta.metaTags as any[])
    .map((tagDef: any) => {
      const tag = document.createElement("meta");
      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });
      tag.setAttribute("data-vue-router-controlled", "");
      return tag;
    })
    .forEach((tag) => document.head.appendChild(tag));
});

export default router;
