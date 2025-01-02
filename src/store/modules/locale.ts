import Cookies from "js-cookie";

// modules/locale.ts
export interface LocaleState {
  locale: string;
}

const state: LocaleState = {
  locale: Cookies.get("locale") || "en",
};

const getters = {
  locale: (state: LocaleState): string => state.locale,
};

const actions = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  setLocale({ commit }: { commit: Function }, locale: string): void {
    Cookies.set("locale", locale, { expires: 365 });
    commit("SET_LOCALE", locale);
  },
};

const mutations = {
  SET_LOCALE(state: LocaleState, locale: string): void {
    state.locale = locale;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
