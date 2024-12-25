import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import { createI18n } from "vue-i18n";
import { VueFire, VueFireAuth } from "vuefire";

import en from "@/locales/en.json";
import vi from "@/locales/vi.json";
import { auth } from "@/firebaseConfig"; // Chỉ import auth nếu không dùng firestore

const messages = {
  en: en,
  vi: vi,
};

const i18n = createI18n({
  locale: "en",
  messages,
});

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
