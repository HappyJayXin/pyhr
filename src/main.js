import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import iView from "iview";
import "iview/dist/styles/iview.css";
import reset from "@/assets/reset.css";

Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(reset);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
