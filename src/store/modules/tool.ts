/* eslint-disable @typescript-eslint/no-explicit-any */
// store/modules/tool.ts

import { ActionTree, GetterTree, MutationTree } from "vuex";

export interface State {
  toolType: string;
}
const state: State = {
  toolType: "1",
};
const getters: GetterTree<State, any> = {
  toolType: (state) => state.toolType,
};
const actions: ActionTree<State, any> = {
  setToolType({ commit }, toolType: string) {
    commit("SET_TOOL_TYPE", toolType);
  },
};
const mutations: MutationTree<State> = {
  SET_TOOL_TYPE(state, toolType: string) {
    state.toolType = toolType;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
