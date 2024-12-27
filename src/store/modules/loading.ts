/* eslint-disable @typescript-eslint/no-explicit-any */
// store/modules/loading.ts

import { MutationTree, ActionTree, GetterTree } from "vuex";
import { Loading } from "@/models/loading";

export interface State extends Loading {
  isLoadingGet: boolean;
  isLoadingPost: boolean;
  isLoadingPut: boolean;
  isLoadingDelete: boolean;
  isLoadingPatch: boolean;
}

const state: State = {
  isLoadingGet: false,
  isLoadingPost: false,
  isLoadingPut: false,
  isLoadingDelete: false,
  isLoadingPatch: false,
};

// Getters interface
const getters: GetterTree<Loading, any> = {
  isLoadingGet: (state) => state.isLoadingGet,
  isLoadingPost: (state) => state.isLoadingPost,
  isLoadingPut: (state) => state.isLoadingPut,
  isLoadingDelete: (state) => state.isLoadingDelete,
  isLoadingPatch: (state) => state.isLoadingPatch,
};

// Actions interface
const actions: ActionTree<Loading, any> = {
  setLoadingGet({ commit }, isLoading: boolean) {
    commit("SET_LOADING_GET", isLoading);
  },

  setLoadingPost({ commit }, isLoading: boolean) {
    commit("SET_LOADING_POST", isLoading);
  },

  setLoadingPut({ commit }, isLoading: boolean) {
    commit("SET_LOADING_PUT", isLoading);
  },

  setLoadingDelete({ commit }, isLoading: boolean) {
    commit("SET_LOADING_DELETE", isLoading);
  },

  setLoadingPatch({ commit }, isLoading: boolean) {
    commit("SET_LOADING_PATCH", isLoading);
  },
};

// Mutations interface
const mutations: MutationTree<Loading> = {
  SET_LOADING_GET(state, isLoading: boolean) {
    state.isLoadingGet = isLoading;
  },

  SET_LOADING_POST(state, isLoading: boolean) {
    state.isLoadingPost = isLoading;
  },

  SET_LOADING_PUT(state, isLoading: boolean) {
    state.isLoadingPut = isLoading;
  },

  SET_LOADING_DELETE(state, isLoading: boolean) {
    state.isLoadingDelete = isLoading;
  },

  SET_LOADING_PATCH(state, isLoading: boolean) {
    state.isLoadingPatch = isLoading;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
