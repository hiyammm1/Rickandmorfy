import { createRouter, createWebHashHistory } from "vue-router";
import HelloWorld from "../views/HomeView.vue";
import EpisodeDetail from "../views/EpisodeView.vue";
import LocationDetail from "../views/LocationView.vue";
import CharacterDetail from "../views/CharacterView.vue";

 
const routes = [
  {
    path: "/",
    name: "home",
    component: HelloWorld,
  },
  {
    path: "/episode/:id",
    name: "EpisodeDetail",
    component: EpisodeDetail,
    props: true,
  },
  {
    path: "/location/:id",
    name: "LocationDetail",
    component: LocationDetail,
    props: true,
  },
  {
    path: "/character/:id",
    name: "CharacterDetail",
    component:CharacterDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;