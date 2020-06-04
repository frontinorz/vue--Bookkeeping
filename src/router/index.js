import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login'
import Fund from '@/views/Fund'
import Calender from '@/views/Calender'
import State from '@/views/State'
import Setting from '@/views/Setting'

import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(VueRouter)

let routes = [
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
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/expense',
    name: 'expense',
    component: Fund,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/income',
    name: 'income',
    component: Fund,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/calender',
    name: 'calender',
    component: Calender,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/state',
    name: 'state',
    component: State,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Setting',
    name: 'setting',
    component: Setting,
    meta: {
      requiresAuth: true
    }
  }
]

let router = new VueRouter({
  routes
})

// 每個路徑處理前檢查 auth 狀態
router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (firebase.auth().currentUser) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});

export default router
