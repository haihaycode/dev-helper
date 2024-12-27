// src/store.ts
import { createStore } from "vuex";
import { State as AuthState } from "./modules/auth";
import { State as LoadingState } from "./modules/loading";
import auth from "./modules/auth";
import loading from "./modules/loading";

interface RootState {
  auth: AuthState;
  loading: LoadingState;
}

export default createStore<RootState>({
  modules: {
    auth,
    loading,
  },
});
