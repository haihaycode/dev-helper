import { RouteRecordRaw } from "vue-router";
import DefaultLayout from "@/views/layouts/DefaultLayout.vue";
import { dynamicImport } from "@/utils/importUtils";

const components = dynamicImport(["views/pages/folder-test/base-pages"]);

const baseRoutes: Array<RouteRecordRaw> = [
  {
    path: "/r/base",
    component: DefaultLayout,
    children: [
      {
        path: "base-page",
        name: "BasePage",
        component: components["views/pages/folder-test/base-pages"],
      },
    ],
  },
];

export default baseRoutes;
