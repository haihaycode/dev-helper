// src/store.ts
import { createStore } from "vuex";
import { State as AuthState, State } from "./modules/auth";
import { State as LoadingState } from "./modules/loading";
import { ILocaleState } from "./modules/locale";
import { RouteState } from "./modules/route";

import auth from "./modules/auth";
import loading from "./modules/loading";
import locale from "./modules/locale";
import route from "./modules/route";

interface RootState {
  auth: AuthState;
  loading: LoadingState;
  tool: State;
  locale: ILocaleState;
  route: RouteState;
}
export default createStore<RootState>({
  modules: {
    auth,
    loading,
    locale,
    route,
  },
});
