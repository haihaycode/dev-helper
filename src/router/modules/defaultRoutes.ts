import { RouteRecordRaw } from "vue-router";
import DefaultLayout from "@/views/layouts/DefaultLayout.vue";
import { dynamicImport } from "@/utils/importUtils";
import { generateUuidV4 } from "@/utils/uniqueIdUtils";
import i18n from "@/services/i18n"; // Import i18n instance

const components = dynamicImport([
  "views/Hello",
  "views/pages/auth-pages/unauthenticated-pages/Login",
  "views/pages/auth-pages/unauthenticated-pages/Register",
  "views/pages/home-pages/v1/home-page",
  "views/pages/folder-test/base-pages",
]);

const t = i18n.global.t; // Get the translation function

const defaultRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        meta: {
          title: t("meta.home.title"),
          metaTags: [
            {
              name: "description",
              content: t("meta.home.description"),
            },
            {
              property: "og:description",
              content: t("meta.home.description"),
            },
          ],
        },
        name: "homePage",
        component: components["views/pages/home-pages/v1/home-page"],
      },
      {
        path: "c/login",
        name: "LoginPage",
        component:
          components["views/pages/auth-pages/unauthenticated-pages/Login"],
        meta: {
          title: t("meta.login.title"),
          metaTags: [
            {
              name: "description",
              content: t("meta.login.description"),
            },
            {
              property: "og:description",
              content: t("meta.login.description"),
            },
          ],
        },
        beforeEnter: (to, from, next) => {
          if (!to.query.refLoginId) {
            const refLoginId = generateUuidV4();
            to.query.refLoginId = refLoginId;
            next({ ...to, query: { ...to.query, refLoginId } });
          } else {
            next();
          }
        },
      },
      {
        path: "c/register",
        name: "RegisterPage",
        component:
          components["views/pages/auth-pages/unauthenticated-pages/Register"],
        meta: {
          title: t("meta.register.title"),
          metaTags: [
            {
              name: "description",
              content: t("meta.register.description"),
            },
            {
              property: "og:description",
              content: t("meta.register.description"),
            },
          ],
        },
        beforeEnter: (to, from, next) => {
          if (!to.query.refId) {
            const refId = generateUuidV4();
            to.query.refId = refId;
            next({ ...to, query: { ...to.query, refId } });
          } else {
            next();
          }
        },
      },
    ],
  },
];

export default defaultRoutes;
