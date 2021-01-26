import { createRouter, createWebHistory } from '@ionic/vue-router';
import Upload from '../views/Upload.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import ListVideos from '../views/ListVideos.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
