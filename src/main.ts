import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "@/assets/css/tailwind.css";
import i18n from "@/services/i18n";
import { VueFire, VueFireAuth } from "vuefire";

import { auth } from "@/firebaseConfig";

const app = createApp(App);
app
  .use(store)
  .use(router)
  .use(Antd)
  .use(i18n)
  .use(VueFire, {
    firebaseApp: auth.app,
    modules: [VueFireAuth()],
  })
  .mount("#app");
