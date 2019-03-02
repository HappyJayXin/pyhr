import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    order: [],
    person_name: ""
  },
  mutations: {
    ADD_ORDER(state, obj) {
      state.order.push(obj);
    }
  },
  actions: {}
});
