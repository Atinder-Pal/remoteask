import { createRouter, createWebHistory } from "@ionic/vue-router";
import Upload from "../views/Upload.vue";
import Login from "../views/Login.vue";
//import Home from '../views/Home.vue'
import ListVideos from "../views/ListVideos.vue";
import Signup from "../components/Signup.vue";
import Signedin from "../components/Signin.vue";
import VideoLanding from "../views/VideoLanding.vue";
import AskQuestion from "../views/AskQuestion.vue";

//import firebase from 'firebase'
// eslint-disable-next-line no-unused-vars
import store from "../store/index";

const routes = [
  {
    path: "/",
    redirect: "/upload",
  },
  {
    path: "/upload",
    name: "Upload",
    component: Upload,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    redirect: "/upload",
  },
  {
    path: "/listVideos",
    name: "ListVideos",
    component: ListVideos,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/video/:uid",
    name: "VideoLanding",
    component: VideoLanding,
  },
  {
    path: "/askquestion",
    name: "AskQuestion",
    component: AskQuestion,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/signedin",
    name: "Signedin",
    component: Signedin,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  const currentUser = store.getters.user.loggedIn;
  console.log(currentUser);

  if (requiresAuth && !currentUser)
    next({ path: "/login", query: { redirect: to.fullPath } });
  //else if (!requiresAuth && currentUser) next("/");
  //else if (!requiresAuth && !currentUser) next();
  else next();
});

export default router;
