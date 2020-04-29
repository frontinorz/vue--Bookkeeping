import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
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
    tableRoutine: [
      {
        expenseTable: [
          {
            date: '2020-03-14',
            amount: 7000,
            descr: "房租",
            category_id: 1,
            routine: 'monthly'
          }
        ],
        incomeTable: [
          {
            date: '2020-03-01',
            amount: 45000,
            descr: "薪水",
            category_id: 1
          }
        ]
      }
    ]
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

    getTargetTable: (state) => (genre) => {
      if (genre === "expense") {
        return state.currentTable.expenseTable
      }
      if (genre === "income") {
        return state.currentTable.incomeTable
      }
    },
    getMonthTable: (state) => (genre) => {
      let monthTable = state.table.filter(item => {
        return item.date.substr(0, 7) === state.currentDate.substr(0, 7)
      })
      let table = []

      if (genre === "expense") {
        table = [].concat(...monthTable.map(item => item.expenseTable))
      }
      if (genre === "special") {
        monthTable.forEach(item => {
          if (item.specialTable) {
            table.push(item.specialTable[0])
          }
        })
        console.log(table)
      }
      if (genre === "income") {
        table = [].concat(...monthTable.map(item => item.incomeTable))
      }
      return table
    },
    getMonthExpenseTotal: (state, getters) => {
      let table = getters.getMonthTable("expense")
      return table.reduce((total, current) => {
        return total + current.amount
      }, 0)
    },
    getMonthSpecialTotal: (state, getters) => {
      let table = getters.getMonthTable("special")
      // console.log(table)
      return table.reduce((total, current) => {
        return total + current.amount
      }, 0)
    },
    getMonthIncomeTotal: (state, getters) => {
      let table = getters.getMonthTable("income")
      return table.reduce((total, current) => { return total + current.amount }, 0)
    },

    getSpecialList(state) {
      return state.currentTable.specialTable ? state.currentTable.specialTable : []
    },

    getBudget(state) {
      return state.budget
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
      if (!state.currentTable) {
        state.table.push({
          date: state.currentDate,
          expenseTable: [],
          incomeTable: []
        })
      }
      state.currentTable = state.table.find(item => item.date == state.currentDate)
    },
    CONTROL_DATE(state, dir) {
      let current = new Date(state.currentDate)
      current.setDate(current.getDate() + dir)

      current = current.toISOString().substr(0, 10)

      this.commit('SET_DATE', current)
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
    EDIT_ITEM(state, payload) {
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
    },
    // Expense handler
    ADD_EXPENSE(state, item) {
      state.currentTable.expenseTable.push(item)
    },
    DELETE_EXPENSE(state, id) {
      state.currentTable.expenseTable.splice(id, 1)
    },
    EDIT_EXPENSE(state, payload) {
      let target = state.currentTable.expenseTable[payload.id]
      target.amount = payload.obj.amount
      target.descr = payload.obj.descr
      target.category_id = payload.obj.category_id
    },
    // Special handler
    ADD_SPECIAL(state, item) {
      if (!state.currentTable.specialTable) {
        state.currentTable.specialTable = []
      }
      state.currentTable.specialTable.push(item)
    },
    DELETE_SPECIAL(state, id) {
      state.currentTable.specialTable.splice(id, 1)
    },
    EDIT_SPECIAL(state, payload) {
      let target = state.currentTable.specialTable[payload.id]
      target.amount = payload.obj.amount
      target.descr = payload.obj.descr
      target.category_id = payload.obj.category_id
    },
    // Income handler
    ADD_INCOME(state, item) {
      state.currentTable.incomeTable.push(item)
    },
    DELETE_INCOME(state, id) {
      state.currentTable.incomeTable.splice(id, 1)
    },
    EDIT_INCOME(state, payload) {
      let target = state.currentTable.incomeTable[payload.id]
      target.amount = payload.obj.amount
      target.descr = payload.obj.descr
      target.category_id = payload.obj.category_id
    },
  },
  actions: {
  },
  modules: {
  }
})
