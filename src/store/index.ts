// src/store.ts
import { createStore } from "vuex";
import { State as AuthState } from "./modules/auth";
import { State as LoadingState } from "./modules/loading";
import { State } from "./modules/tool";
import auth from "./modules/auth";
import loading from "./modules/loading";
import tool from "./modules/tool";

interface RootState {
  auth: AuthState;
  loading: LoadingState;
  tool: State;
}

export default createStore<RootState>({
  modules: {
    auth,
    loading,
    tool,
  },
});
