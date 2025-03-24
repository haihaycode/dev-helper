import Cookies from "js-cookie";

// modules/locale.ts
export interface ILocaleState {
  locale: string;
}

const state: ILocaleState = {
  locale: Cookies.get("locale") || "en",
};

const getters = {
  locale: (state: ILocaleState): string => state.locale,
};

const actions = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  setLocale({ commit }: { commit: Function }, locale: string): void {
    Cookies.set("locale", locale, { expires: 365 });
    commit("SET_LOCALE", locale);
  },
};

const mutations = {
  SET_LOCALE(state: ILocaleState, locale: string): void {
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
