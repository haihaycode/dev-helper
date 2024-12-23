import { RouteRecordRaw } from "vue-router";
import DefaultLayout from "@/views/layouts/DefaultLayout.vue";
import { dynamicImport } from "@/utils/importUtils";
import { generateUuidV4 } from "@/utils/uniqueIdUtils";

const components = dynamicImport([
  "views/Hello",
  "views/pages/folder-test/Login",
  "views/pages/folder-test/Register",
  "views/pages/folder-test/test-component-f1",
]);

const defaultRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "hello",
        name: "HelloPage",
        component: components["views/Hello"],
      },
      {
        path: "login",
        name: "LoginPage",
        component: components["views/pages/folder-test/Login"],
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
        path: "register",
        name: "RegisterPage",
        component: components["views/pages/folder-test/Register"],
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
      {
        path: "test-component-f1",
        name: "TestComponentF1Page",
        component: components["views/pages/folder-test/test-component-f1"],
      },
    ],
  },
];

export default defaultRoutes;
