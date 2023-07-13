import Vue from "vue";
import VueRouter from "vue-router";
import GamesView from "@/components/GamesView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Games",
    component: GamesView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
