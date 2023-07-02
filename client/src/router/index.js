import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TodoList from "../components/todo-components/TodoList.vue";
import SignupForm from "../components/auth/signup.vue";
import SigninForm from "../components/auth/signin.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/todo",
      name: "todo",
      component: TodoList,
      meta: { requiresAuth: true },
    },
    {
      path: "/signup",
      name: "sign up",
      component: SignupForm,
    },
    {
      path: "/signin",
      name: "sign in",
      component: SigninForm,
    },
  ],
});

export default router;
