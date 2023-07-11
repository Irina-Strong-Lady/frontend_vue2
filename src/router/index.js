import Vue from "vue";
import VueRouter from "vue-router";
import Shark from "../components/SharkView.vue";
import Games from "../components/GamesView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/shark",
    name: "Shark",
    component: Shark,
  },
  {
    path: "/games",
    name: "Games",
    component: Games,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
