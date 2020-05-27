import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import { sync } from 'vuex-router-sync'


import Echarts from 'vue-echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

import firebase from 'firebase'
import "@/db";

sync(store, router)
Vue.component('chart', Echarts);
Vue.config.productionTip = false

let app
firebase.auth().onAuthStateChanged(() => {
  console.log("change")
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')

  }
})


