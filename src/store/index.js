import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    category: [
      {
        _id: 1,
        title: "早餐",
        icon: "mdi-star",
        order: 0
      },
      {
        _id: 2,
        title: "午餐",
        icon: "mdi-star",
        order: 1
      },
      {
        _id: 3,
        title: "晚餐",
        icon: "mdi-star",
        order: 2
      }
    ],
    costList: [
      {
        _id: 1,
        date: "2020-03-12",
        amount: 35,
        descr: "蛋餅",
        category_id: 1
      },
      {
        _id: 2,
        date: "2020-03-12",
        amount: 100,
        descr: "牛肉麵",
        category_id: 2
      },
      {
        _id: 3,
        date: "2020-03-12",
        amount: 50,
        descr: "滷肉飯",
        category_id: 3
      }
    ],
  },
  getters: {
    categoryIcon: (state) => (id) => {
      return state.category.find(item => item._id == id).icon
    },
    categoryTitle: (state) => (id) => {
      return state.category.find(item => item._id == id).title
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
