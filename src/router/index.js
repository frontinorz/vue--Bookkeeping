import Vue from 'vue'
import VueRouter from 'vue-router'

import Fund from '@/views/Fund'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: '/expense',
    name: 'expense',
    component: Fund
  },
  {
    path: '/income',
    name: 'income',
    component: Fund
  }
]

const router = new VueRouter({
  routes
})

export default router
