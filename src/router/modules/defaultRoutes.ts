import { RouteRecordRaw } from "vue-router";
import DefaultLayout from "@/views/layouts/DefaultLayout.vue";
import { dynamicImport } from "@/utils/importUtils";

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
      },
      {
        path: "register",
        name: "RegisterPage",
        component: components["views/pages/folder-test/Register"],
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
