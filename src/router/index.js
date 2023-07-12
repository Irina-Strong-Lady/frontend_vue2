import Vue from "vue";
import VueRouter from "vue-router";
import Shark from "@/components/Shark.vue";
import GamesView from "@/components/GamesView.vue";
import World from "@/components/World.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "World",
    component: World,
  },
  {
    path: "/shark",
    name: "Shark",
    component: Shark,
  },
  {
    path: "/games",
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
