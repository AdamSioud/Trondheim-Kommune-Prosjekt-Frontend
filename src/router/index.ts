import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MapView from '../views/MapView.vue'
import Error404View from '@/views/Error404View.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'map',
    component: MapView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: Error404View
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
