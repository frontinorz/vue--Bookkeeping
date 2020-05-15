import Vue from 'vue'
import VueRouter from 'vue-router'

import Fund from '@/views/Fund'
import Calender from '@/views/Calender'
import State from '@/views/State'

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
    path: '/',
    redirect: '/expense'
  },
  {
    path: '/expense',
    name: 'expense',
    component: Fund
  },
  {
    path: '/income',
    name: 'income',
    component: Fund
  },
  {
    path: '/calender',
    name: 'calender',
    component: Calender
  },
  {
    path: '/state',
    name: 'state',
    component: State
  }
]

const router = new VueRouter({
  routes
})

export default router
