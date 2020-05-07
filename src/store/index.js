import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const url = 'http://localhost:3000'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    currentDate: new Date().toISOString().substr(0, 10),
    currentTable: {},
    budget: 15000,
    categoryExpense: [
      {
        _id: 0,
        title: "未分類",
        icon: "mdi-star",
        order: 0
      },
      {
        _id: 1,
        title: "早餐",
        icon: "mdi-star",
        order: 1
      },
      {
        _id: 2,
        title: "午餐",
        icon: "mdi-star",
        order: 2
      },
      {
        _id: 3,
        title: "晚餐",
        icon: "mdi-star",
        order: 3
      },
      {
        _id: 4,
        title: "購物",
        icon: "mdi-star",
        order: 4
      }
    ],
    categoryIncome: [
      {
        _id: 0,
        title: "未分類",
        icon: "mdi-star",
        order: 0
      },
      {
        _id: 1,
        title: "薪水",
        icon: "mdi-star",
        order: 1
      },
      {
        _id: 2,
        title: "獎金",
        icon: "mdi-star",
        order: 2
      },
      {
        _id: 3,
        title: "投資",
        icon: "mdi-star",
        order: 3
      }
    ],
    table: [
      {
        date: '2020-03-10',
        expenseTable: [
          {
            amount: 35,
            descr: "蛋餅",
            category_id: 1
          },
          {
            amount: 300,
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
            amount: 24000,
            descr: "薪水",
            category_id: 1
          },
          {
            amount: 200,
            descr: "統一發票中獎",
            category_id: 1
          },
        ]
      },
      {
        date: '2020-03-09',
        expenseTable: [
          {
            amount: 40,
            descr: "豬排漢堡",
            category_id: 1
          },
          {
            amount: 150,
            descr: "義大利麵",
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
      },
      {
        date: '2020-04-13',
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
        date: '2020-04-14',
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
          },
          {
            amount: 2500,
            descr: "日常用品",
            category_id: 4
          }
        ],
        incomeTable: [
          {
            amount: 100,
            descr: "撿到錢",
            category_id: 2
          }
        ]
      },
      {
        date: '2020-04-27',
        expenseTable: [
        ],
        incomeTable: [
          {
            amount: 100,
            descr: "撿到錢",
            category_id: 2
          }
        ]
      },
      {
        date: '2020-04-29',
        expenseTable: [
        ],
        incomeTable: [
          {
            amount: 100,
            descr: "撿到錢",
            category_id: 2
          }
        ],
        specialTable: [
          {
            amount: 20000,
            descr: "出國旅遊",
            category_id: 2,
            isSpecial: true
          }
        ]
      }
    ],
    expenseTable: [],
    incomeTable: [],
  },
  getters: {
    getCategoryList: (state) => {
      if (state.route.name === "expense") {
        return state.categoryExpense
      }
      if (state.route.name === "income") {
        return state.categoryIncome
      }
    },
    getCategoryItem: (state, getters) => (id) => {
      return getters.getCategoryList.find(item => item._id == id)
    },

    getColorTheme: (state) => {
      if (state.route.name === "expense") {
        return "red lighten-1";
      }
      else if (state.route.name === "income") {
        return "teal lighten-1";
      }
      else {
        return "blue";
      }

    },

    getDateTable: (state) => (genre) => {
      if (genre === "expense") {
        return state.expenseTable.filter(item =>
          item.date === state.currentDate
        ).filter(item => item.isSpecial == false)
      }
      if (genre === "special") {
        return state.expenseTable.filter(item =>
          item.date === state.currentDate
        ).filter(item => item.isSpecial == true)
      }
      if (genre === "income") {
        return state.incomeTable.filter(item => item.date === state.currentDate)
      }
    },
    getMonthTable: (state) => (genre) => {
      if (genre === "expense") {
        return state.expenseTable.filter(item =>
          item.date.substr(0, 7) === state.currentDate.substr(0, 7)
        ).filter(item => item.isSpecial === false)
      }
      if (genre === "special") {
        return state.expenseTable.filter(item =>
          item.date.substr(0, 7) === state.currentDate.substr(0, 7)).filter(item => item.isSpecial == true)
      }
      if (genre === "income") {
        return state.incomeTable.filter(item =>
          item.date.substr(0, 7) === state.currentDate.substr(0, 7)
        )
      }
    },
    getMonthExpenseTotal: (state, getters) => {
      let table = getters.getMonthTable("expense")
      return table.reduce((total, current) => {
        return total + current.amount
      }, 0)
    },
    getMonthSpecialTotal: (state, getters) => {
      let table = getters.getMonthTable("special")
      return table.reduce((total, current) => {
        return total + current.amount
      }, 0)
    },
    getMonthIncomeTotal: (state, getters) => {
      let table = getters.getMonthTable("income")
      return table.reduce((total, current) => { return total + current.amount }, 0)
    },

    getBudget(state) {
      return state.budget
    },
    getDate(state) {
      return state.currentDate
    }
  },
  mutations: {
    setData(state, data) {
      state.expenseTable = data.expenseTable
      state.incomeTable = data.incomeTable
    },
    setDate(state, date) {
      state.currentDate = date
      let dateTable = state.table.find(item => item.date == state.currentDate)
      if (dateTable) {
        state.currentTable = dateTable
      } else {
        state.currentTable = {
          date: state.currentDate,
        }
        state.table.push(state.currentTable)
      }

    },
    controlDate(state, dir) {
      let current = new Date(state.currentDate)
      current.setDate(current.getDate() + dir)

      current = current.toISOString().substr(0, 10)

      this.commit('setDate', current)
    },

    // Expense handler
    setExpense(state, table) {
      state.expenseTable = table
    },
    deleteExpense(state, index) {
      state.expenseTable.splice(index, 1)
    },
    updateExpense(state, item) {
      let target = state.expenseTable.find(expense =>
        expense.id === item.id
      )
      target.amount = item.amount
      target.descr = item.descr
      target.category_id = item.category_id
    },

    // Income handler
    setIncome(state, table) {
      state.incomeTable = table
    },
    deleteIncome(state, index) {
      state.incomeTable.splice(index, 1)
    },
    updateIncome(state, item) {
      let target = state.incomeTable.find(income =>
        income.id === item.id
      )
      target.amount = item.amount
      target.descr = item.descr
      target.category_id = item.category_id
    },
  },
  actions: {
    GET_DATA({ commit }) {
      axios.get(url + '/db').then((res) => {
        commit('setData', res.data)
      });
    },

    // Expense handler
    GET_EXPENSE({ commit }) {
      axios.get(url + '/expenseTable').then((res) => {
        commit('setExpense', res.data)
      })
    },
    CREATE_EXPENSE(context, item) {
      axios.post(url + '/expenseTable', item).then(() => {
        context.dispatch('GET_EXPENSE')
      });
    },
    DELETE_EXPENSE(context, item) {
      let index = context.state.expenseTable.indexOf(item)
      if (index == -1) return false
      axios.delete(url + '/expenseTable/' + item.id).then(() => {
        context.commit('deleteExpense', index)
      });
    },
    UPDATE_EXPENSE(context, item) {
      axios.patch(url + '/expenseTable/' + item.id, {
        amount: item.amount,
        descr: item.descr,
        category_id: item.category_id
      }).then(() => {
        context.commit('updateExpense', item)
      });
    },

    // Income handler
    GET_INCOME({ commit }) {
      axios.get(url + '/incomeTable').then((res) => {
        commit('setIncome', res.data)
      });
    },
    CREATE_INCOME(context, item) {
      axios.post(url + '/incomeTable', item).then(() => {
        context.dispatch('GET_INCOME')
      });
    },
    DELETE_INCOME(context, item) {
      let index = context.state.incomeTable.indexOf(item)
      if (index == -1) return false
      axios.delete(url + '/incomeTable/' + item.id).then(() => {
        context.commit('deleteIncome', index)
      });
    },
    UPDATE_INCOME(context, item) {
      axios.patch(url + '/incomeTable/' + item.id, {
        amount: item.amount,
        descr: item.descr,
        category_id: item.category_id
      }).then(() => {
        context.commit('updateIncome', item)
      });
    },
  },
  modules: {
  }
})
