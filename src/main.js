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
  apiKey: "AIzaSyCNmyDiS5Sh-BPJ6o9ePI-4aIDHp6M7qhU",
  authDomain: "pyhr-5278.firebaseapp.com",
  databaseURL: "https://pyhr-5278.firebaseio.com",
  projectId: "pyhr-5278",
  storageBucket: "pyhr-5278.appspot.com",
  messagingSenderId: "114577344368"
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
