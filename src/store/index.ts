// src/store.ts
import { createStore } from "vuex";
import { State as AuthState } from "./modules/auth";
import { State as LoadingState } from "./modules/loading";
import { State } from "./modules/tool";
import { LocaleState } from "./modules/locale";
import { RouteState } from "./modules/route";

import auth from "./modules/auth";
import loading from "./modules/loading";
import tool from "./modules/tool";
import locale from "./modules/locale";
import route from "./modules/route";

interface RootState {
  auth: AuthState;
  loading: LoadingState;
  tool: State;
  locale: LocaleState;
  route: RouteState;
}
export default createStore<RootState>({
  modules: {
    auth,
    loading,
    tool,
    locale,
    route,
  },
});
