import { createRouter, createWebHistory } from "vue-router";

const User = {
  // make sure to add a prop named exactly like the route param
  props: ["id"],
  template: "<div>User {{ id }}</div>",
};

// 1. Define route components.
// These can be imported from other files
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import Jokes from "@/views/Jokes.vue";

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/jokes",
    name: "Jokes",
    component: Jokes,
    props: true,
  },
  { path: "/user/:id", component: User, props: true },
  {
    path: "/:catchAll(.*)*",
    name: "PageNotFound",
    component: PageNotFound,
  },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

export default router;
