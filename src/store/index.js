import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    paramData: {}
  },
  getters: {
    getParamData: state => {
      return state.paramData
    },
  },
  mutations: {
    setParamData(state, payload) {
      state.paramData = payload
    },
  },
  actions: {},
  modules: {},
});
