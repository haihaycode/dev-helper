import { RouteRecordRaw } from "vue-router";
import MobileInfoLayout from "@/views/pages/auth-pages/authenticated-pages/MobileInfoLayout.vue";
import DefaultLayout from "@/views/layouts/DefaultLayout.vue";
import AccountOverview from "@/views/pages/auth-pages/authenticated-pages/AccountOverview.vue";
import AccountInformation from "@/views/pages/auth-pages/authenticated-pages/AccountInfomation.vue";
import AccountCalendarWork from "@/views/pages/auth-pages/authenticated-pages/AccountCalendarWork.vue";
const accountRoutes: Array<RouteRecordRaw> = [
  {
    path: "/a",
    name: "Account",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "AccountOverview",
        children: [
          {
            path: "account",
            meta: {
              requiresAuth: true,
              tag: "overviewaccount",
            },
            name: "AccountOverview",
            component: AccountOverview,
          },
          {
            path: "account/tab=mobile",
            meta: {
              requiresAuth: true,
              tag: "MobileInfoLayout",
            },
            name: "MobileInfoLayout",
            component: MobileInfoLayout,
          },
          {
            path: "account/tab=overview",
            meta: {
              requiresAuth: true,
              tag: "overviewaccount",
            },
            name: "AccountOverview",
            component: AccountOverview,
          },
        ],
      },
      {
        name: "AccountInformation",
        path: "",
        children: [
          {
            path: "account/tab=information",
            meta: {
              tag: "infomationaccount",
              requiresAuth: true,
            },
            name: "AccountInformation",
            component: AccountInformation,
          },
          {
            path: "account/tab=calendar-work",
            meta: {
              tag: "infomationaccount",
              requiresAuth: true,
            },
            name: "AccountCalendarWork",
            component: AccountCalendarWork,
          },
        ],
      },
    ],
  },
];

export default accountRoutes;
