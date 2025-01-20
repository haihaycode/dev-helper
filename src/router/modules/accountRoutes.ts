import { RouteRecordRaw } from "vue-router";
import DefaultLayout from "@/views/layouts/DefaultLayout.vue";
import Account from "@/views/pages/auth-pages/authenticated-pages/Account.vue";

const accountRoutes: Array<RouteRecordRaw> = [
  {
    path: "/a",
    component: DefaultLayout,
    children: [
      {
        path: "account",
        meta: {
          requiresAuth: true,
        },
        name: "my-account",
        component: Account,
      },
    ],
  },
];

export default accountRoutes;
