import { createRouter, createWebHistory } from '@ionic/vue-router';
import Upload from '../views/Upload.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import ListVideos from '../views/ListVideos.vue'
import Signup from '../components/Signup.vue'
import Signedin from '../components/Signin.vue'

import firebase from 'firebase'
// eslint-disable-next-line no-unused-vars
import store from '../store/index'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/upload',
    name: 'Upload',
    component: Upload,
    meta: {
      requiresAuth: true
    }
  },
   {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/listVideos',
    name: 'ListVideos',
    component: ListVideos,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup 
  },
  {
    path: "/signedin",
    name: "Signedin",
    component: Signedin,
    meta: {
      requiresAuth: true
    }
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser  
  console.log(currentUser)
  if (requiresAuth && !currentUser) next({ path: '/login', query: { redirect: to.fullPath } })  
  else next();
})


// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//       if (store.getters.user.loggedIn) {
//           next()
//           return
//       }
//       next('/login')
//   } else {
//       next()
//   }
// })

export default router
