import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: 'expense',
    currentDate: new Date().toISOString().substr(0, 10),
    currentTable: {},
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
    table: [
      {
        date: '2020-03-13',
        costTable: [
          {
            _id: 1,
            amount: 35,
            descr: "蛋餅",
            category_id: 1
          },
          {
            _id: 2,
            amount: 100,
            descr: "牛肉麵",
            category_id: 2
          },
          {
            _id: 3,
            amount: 50,
            descr: "滷肉飯",
            category_id: 3
          }
        ]
      },
      {
        date: '2020-03-14',
        costTable: [
          {
            amount: 50,
            descr: "豬排漢堡",
            category_id: 1
          },
          {
            amount: 100,
            descr: "青醬義大利麵",
            category_id: 2
          },
          {
            amount: 50,
            descr: "滷肉飯",
            category_id: 3
          }
        ]
      }
    ],
  },
  getters: {
    categoryIcon: (state) => (id) => {
      return state.category.find(item => item._id == id).icon
    },
    categoryTitle: (state) => (id) => {
      return state.category.find(item => item._id == id).title
    },
    getNowCostTable: (state) => {
      return state.currentTable.costTable
    },

    getDate(state) {
      return state.currentDate
    }
  },
  mutations: {
    SET_DATE(state, date) {
      state.currentDate = date
      state.currentTable = state.table.find(item => item.date == state.currentDate)
      this.commit('ADD_DATE')
    },
    ADD_DATE(state) {
      if (!state.table.find(item => item.date == state.currentDate)) {
        state.table.push({
          date: state.currentDate,
          costTable: []
        })
        state.currentTable = state.table.find(item => item.date == state.currentDate)
      }
    },

    ADD_COST(state, cost) {
      state.currentTable.costTable.push(cost)
    },
    DELETE_COST(state, id) {
      state.currentTable.costTable.splice(id, 1)
    },
    EDIT_COST(state, payload) {
      let target = state.currentTable.costTable[payload.id]
      target.amount = payload.obj.amount
      target.descr = payload.obj.descr
      target.category_id = payload.obj.category_id
    }
  },
  actions: {
  },
  modules: {
  }
})
