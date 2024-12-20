import { RouteRecordRaw } from "vue-router";
import DefaultLayout from "@/views/layouts/DefaultLayout.vue";
import Hello from "@/views/Hello.vue";

const defaultRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "hello",
        name: "hello",
        component: Hello,
      },
    ],
  },
];

export default defaultRoutes;
