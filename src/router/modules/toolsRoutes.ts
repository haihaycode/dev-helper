import { RouteRecordRaw } from "vue-router";
import DefaultLayout from "@/views/layouts/DefaultLayout.vue";
import { getTools } from "@/services/tools/toolsService";
import ToolsLayout from "@/views/layouts/ToolsLayout.vue";
import i18n from "@/services/i18n"; // Import i18n instance

const tools = getTools();
const t = i18n.global.t; // Get the translation function

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
            meta: {
              title: t("meta.tools.title"),
              metaTags: [
                {
                  name: "description",
                  content: t("meta.tools.description"),
                },
                {
                  property: "og:description",
                  content: t("meta.tools.description"),
                },
              ],
            },
          },
          ...tools.map((tool) => ({
            path: tool.slug,
            name: tool.nameSlug,
            component: () =>
              import(
                `@/views/pages/tools-pages/${tool.idtoolsType}/${tool.slug}/index.vue`
              ).catch(
                () => import("@/views/pages/folder-errors/NotFoundPage.vue")
              ),
            meta: {
              title: t(`tools.name.${tool.nameSlug}`),
              metaTags: [
                {
                  name: "description",
                  content: t(`tools.description.${tool.nameSlug}`),
                },
                {
                  property: "og:description",
                  content: t(`tools.description.${tool.nameSlug}`),
                },
              ],
            },
          })),
        ],
      },
    ],
  },
];

export default toolsRoutes;
