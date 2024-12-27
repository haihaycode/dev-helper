// src/i18n.ts
import { createI18n } from "vue-i18n";
import en from "@/locales/en.json";
import vi from "@/locales/vi.json";

const messages = {
  en: en,
  vi: vi,
};

const i18n = createI18n({
  locale: "en",
  messages,
});

export default i18n;
