import { RouteRecordRaw } from "vue-router";
import AdminDashboard from "../views/AdminDashboard.vue";

const adminRoutes: Array<RouteRecordRaw> = [
  {
    path: "/admin",
    component: AdminDashboard,
    children: [
      {
        path: "",
        name: "AdminDashboard",
        component: AdminDashboard,
      },
    ],
  },
];

export default adminRoutes;
