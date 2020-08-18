import Vue from "vue";
import VueRouter from "vue-router";
import Start from "../views/Start.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Start",
    component: Start
  },
  {
    path: "/Game",
    name: "Game",
    // route level code-splitting
    // this generates a separate chunk (Game.[hash].js) for this route
    // which is lazy-loaded when the route is visited. 
    
    // (Enne ei lae kasutajale alla komponenti, kui nuppu pole vajutatud)
    component: () =>
      import(/* webpackChunkName: "Game" */ "../views/Game.vue")
  },
  {
    path: "/End",
    name: "End",
    component: () =>
      import("../views/End.vue"),
      props: true
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
