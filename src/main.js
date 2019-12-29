import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import iView from "iview";
import "iview/dist/styles/iview.css";
import reset from "@/assets/reset.css";
import "vue2-animate/dist/vue2-animate.min.css";
import firebase from "firebase/app";

// Initialize Firebase
var config = {
  apiKey: "YOUR_KEYS",
  authDomain: "YOUR_DOMAIN",
  databaseURL: "URL",
  projectId: "YOUR_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "ID"
};
firebase.initializeApp(config);

Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(reset);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
