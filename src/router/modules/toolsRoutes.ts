import { RouteRecordRaw } from "vue-router";
import DefaultLayout from "@/views/layouts/DefaultLayout.vue";
import { dynamicImport } from "@/utils/importUtils";
import ToolsLayout from "@/views/layouts/ToolsLayout.vue";

const components = dynamicImport(["views/pages/tools-pages/index"]);

const toolsRoutes: Array<RouteRecordRaw> = [
  {
    path: "/t/tools",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "tools",
        component: ToolsLayout,
        children: [
          {
            path: "",
            name: "toolsIndex",
            component: components["views/pages/tools-pages/index"], // Component cho trang con
          },
        ],
      },
    ],
  },
];

export default toolsRoutes;
