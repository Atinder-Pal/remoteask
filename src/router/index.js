import { createRouter, createWebHistory } from '@ionic/vue-router';
import Upload from '../views/Upload.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import ListVideos from '../views/ListVideos.vue'
import Signup from '../components/Signup.vue'
import Signedin from '../components/Signin.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/upload',
    name: 'Upload',
    component: Upload
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
    component: ListVideos
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup 
  },
  {
    path: "/signedin",
    name: "Signedin",
    component: Signedin 
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
