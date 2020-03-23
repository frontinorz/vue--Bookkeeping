import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: 'expense',
    currentDate: new Date().toISOString().substr(0, 10),
    currentTable: {},
    categoryExpense: [
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
    categoryIncome: [
      {
        _id: 1,
        title: "薪水",
        icon: "mdi-star",
        order: 0
      },
      {
        _id: 2,
        title: "獎金",
        icon: "mdi-star",
        order: 1
      },
      {
        _id: 3,
        title: "投資",
        icon: "mdi-star",
        order: 2
      }
    ],
    table: [
      {
        date: '2020-03-13',
        expenseTable: [
          {
            amount: 35,
            descr: "蛋餅",
            category_id: 1
          },
          {
            amount: 100,
            descr: "牛肉麵",
            category_id: 2
          },
          {
            amount: 50,
            descr: "滷肉飯",
            category_id: 3
          }
        ],
        incomeTable: [
          {
            amount: 35000,
            descr: "薪水",
            category_id: 1
          },
          {
            amount: 500,
            descr: "統一發票中獎",
            category_id: 1
          },
        ]
      },
      {
        date: '2020-03-14',
        expenseTable: [
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
        ],
        incomeTable: [
          {
            amount: 100,
            descr: "撿到錢",
            category_id: 2
          }
        ]
      }
    ],
  },
  getters: {
    getCategoryList(state) {
      if (state.route.name === "expense") {
        return state.categoryExpense;
      }
      if (state.route.name === "income") {
        return state.categoryIncome;
      }
    },
    getCategoryItem: (state, getters) => (id) => {
      return getters.getCategoryList.find(item => item._id == id);
    },
    getTargetTable: (state) => {
      if (state.route.name === "expense") {
        return state.currentTable.expenseTable;
      }
      if (state.route.name === "income") {
        return state.currentTable.incomeTable;
      }
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
          expenseTable: [],
          incomeTable: []
        })
        state.currentTable = state.table.find(item => item.date == state.currentDate)
      }
    },

    ADD_ITEM(state, item) {
      if (state.route.name === "expense") {
        state.currentTable.expenseTable.push(item)
      }
      if (state.route.name === "income") {
        state.currentTable.incomeTable.push(item)
      }
    },
    DELETE_ITEM(state, id) {
      if (state.route.name === "expense") {
        state.currentTable.expenseTable.splice(id, 1)
      }
      if (state.route.name === "income") {
        state.currentTable.incomeTable.splice(id, 1)
      }
    },
    EDIT_COST(state, payload) {
      let target;
      if (state.route.name === "expense") {
        target = state.currentTable.expenseTable[payload.id]
      }
      if (state.route.name === "income") {
        target = state.currentTable.incomeTable[payload.id]
      }
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
