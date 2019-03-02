import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

function loadView(view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${view}/${view}.vue`);
}

export default new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", redirect: { name: "prod" } },
    { path: "/prod", name: "prod", component: loadView("prod") },
    { path: "/order", name: "order", component: loadView("order") }
  ]
});
