import { RouteRecordRaw } from "vue-router";
import DefaultLayout from "@/views/layouts/DefaultLayout.vue";
import { getTools } from "@/services/tools/toolsService";
import ToolsLayout from "@/views/layouts/ToolsLayout.vue";
const tools = getTools();
const toolsRoutes: Array<RouteRecordRaw> = [
  {
    path: "/t",
    component: DefaultLayout,
    children: [
      {
        path: "tools",
        name: "tools",
        component: ToolsLayout,
        children: [
          {
            path: "",
            name: "toolsIndex",
            component: () => import("@/views/pages/tools-pages/index.vue"),
          },
          ...tools.map((tool) => ({
            path: tool.slug,
            name: tool.nameSlug,
            component: () =>
              import(
                `@/views/pages/tools-pages/encryption-tools/${tool.slug}/index.vue`
              ),
          })),
        ],
      },
    ],
  },
];

export default toolsRoutes;
