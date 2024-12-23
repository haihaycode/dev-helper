import { RouteRecordRaw } from "vue-router";
import { dynamicImport } from "@/utils/importUtils";
import { generateCryptoId } from "@/utils/uniqueIdUtils";

const components = dynamicImport([
  "views/pages/folder-errors/NotFoundPage",
  "views/pages/folder-errors/ServerErrorPage",
]);

const errorRoutes: Array<RouteRecordRaw> = [
  {
    path: "/client/e/404",
    name: "NotFoundPage",
    component: components["views/pages/folder-errors/NotFoundPage"],
    beforeEnter: (to, from, next) => {
      if (!to.query.errorId) {
        const errorId = generateCryptoId();
        to.query.errorId = errorId;
        next({ ...to, query: { ...to.query, errorId } });
      } else {
        next();
      }
    },
  },
  {
    path: "/client/e/500",
    name: "ServerErrorPage",
    component: components["views/pages/folder-errors/ServerErrorPage"],
    beforeEnter: (to, from, next) => {
      if (!to.query.errorId) {
        const errorId = generateCryptoId();
        to.query.errorId = errorId;
        next({ ...to, query: { ...to.query, errorId } });
      } else {
        next();
      }
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "NotFoundPage" },
  },
];

export default errorRoutes;
