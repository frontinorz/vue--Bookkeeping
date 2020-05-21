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
    iconBank: [],
    categoryExpense: [],
    categoryIncome: [],
    expenseTable: [],
    incomeTable: []
  },
  getters: {
    getCategoryList: (state) => (genre) => {
      if (genre === "expense") {
        return state.categoryExpense
      }
      if (genre === "income") {
        return state.categoryIncome
      }
    },
    getCategoryItem: (state, getters) => (genre) => (id) => {
      return getters.getCategoryList(genre).find(item => item.id == id)
    },

    getColorTheme: (state) => {
      if (state.route.name === "expense") {
        return "red accent-2 white--text";
      }
      else if (state.route.name === "income") {
        return "teal lighten-1 white--text";
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


    getDate(state) {
      return state.currentDate
    },
    getBudget(state) {
      return state.budget
    },
    getIcons(state) {
      return state.iconBank
    }
  },
  mutations: {
    setData(state, data) {
      state.expenseTable = data.expenseTable
      state.incomeTable = data.incomeTable
      state.categoryExpense = data.expenseCategory
      state.categoryIncome = data.incomeCategory
      state.budget = data.settings.budgetAmount
    },
    setDate(state, date) {
      state.currentDate = date
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

    // Budget Handler
    setBudget(state, amount) {
      state.budget = amount
    },

    // Category Handler
    setIconBank(state, data) {
      state.iconBank = data
    },
    deleteCategory(state, table) {
      table.forEach(item => item.category_id = 0)
    },
    setExpenseCategory(state, data) {
      state.categoryExpense = data
    },
    setIncomeCategory(state, data) {
      state.categoryIncome = data
    }

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
    UPDATE_EXPENSE(context, item) {
      axios.patch(url + '/expenseTable/' + item.id, {
        amount: item.amount,
        descr: item.descr,
        category_id: item.category_id
      }).then(() => {
        context.commit('updateExpense', item)
      });
    },
    DELETE_EXPENSE(context, item) {
      let index = context.state.expenseTable.indexOf(item)
      if (index == -1) return false
      axios.delete(url + '/expenseTable/' + item.id).then(() => {
        context.commit('deleteExpense', index)
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
    UPDATE_INCOME(context, item) {
      axios.patch(url + '/incomeTable/' + item.id, {
        amount: item.amount,
        descr: item.descr,
        category_id: item.category_id
      }).then(() => {
        context.commit('updateIncome', item)
      });
    },
    DELETE_INCOME(context, item) {
      let index = context.state.incomeTable.indexOf(item)
      if (index == -1) return false
      axios.delete(url + '/incomeTable/' + item.id).then(() => {
        context.commit('deleteIncome', index)
      });
    },

    // Budget Handler
    GET_BUDGET({ commit }) {
      axios.get(url + '/settings').then((res) => {
        commit('setBudget', res.data.budgetAmount)
      })
    },
    UPDATE_BUDGET(context, amount) {
      axios.patch(url + '/settings', {
        budgetAmount: amount
      }).then(() => {
        context.commit('setBudget', amount)
      })
    },

    // Category handler
    GET_ICON({ commit }) {
      axios.get(url + '/iconBank').then((res) => {
        commit('setIconBank', res.data)
      })
    },
    // - Expense Category
    GET_EXPENSE_CATEGORY({ commit }) {
      axios.get(url + '/expenseCategory').then((res) => {
        commit('setExpenseCategory', res.data)
      })
    },
    CREATE_EXPENSE_CATEGORY(context, item) {
      axios.post(url + '/expenseCategory', item).then(() => {
        context.dispatch('GET_EXPENSE_CATEGORY')
      });
    },
    UPDATE_EXPENSE_CATEGORY(context, item) {
      axios.patch(url + '/expenseCategory/' + item.id, {
        name: item.name,
        icon: item.icon
      }).then(() => {
        context.dispatch('GET_EXPENSE_CATEGORY')
      });
    },
    DELETE_EXPENSE_CATEGORY(context, id) {
      axios.delete(url + '/expenseCategory/' + id).then(() => {
        context.dispatch('GET_EXPENSE_CATEGORY')
        // 抓出所有應用此分類 id 的物件
        let expenseSelected = context.state.expenseTable
          .filter(item => item.category_id == id)
        if (expenseSelected.length == 0) return

        // 取出 id
        let expenseSelectedId = expenseSelected.map(item => item.id)

        // 一次送出全部的修改
        axios.all(expenseSelectedId.map(id => {
          axios.patch(url + '/expenseTable/' + id, {
            category_id: 0
          })
        }))
          .then(() => {
            context.commit('deleteCategory', expenseSelected)
          });
      });
    },
    // - Income Category
    GET_INCOME_CATEGORY({ commit }) {
      axios.get(url + '/incomeCategory').then((res) => {
        commit('setIncomeCategory', res.data)
      })
    },
    CREATE_INCOME_CATEGORY(context, item) {
      axios.post(url + '/incomeCategory', item).then(() => {
        context.dispatch('GET_INCOME_CATEGORY')
      });
    },
    UPDATE_INCOME_CATEGORY(context, item) {
      axios.patch(url + '/incomeCategory/' + item.id, {
        name: item.name,
        icon: item.icon
      }).then(() => {
        context.dispatch('GET_INCOME_CATEGORY')
      });
    },
    DELETE_INCOME_CATEGORY(context, id) {
      axios.delete(url + '/incomeCategory/' + id).then(() => {
        context.dispatch('GET_INCOME_CATEGORY')
        // 抓出所有應用此分類 id 的物件
        let incomeSelected = context.state.incomeTable
          .filter(item => item.category_id == id)
        if (incomeSelected.length == 0) return

        // 取出 id
        let incomeSelectedId = incomeSelected.map(item => item.id)

        // 一次送出全部的修改
        axios.all(incomeSelectedId.map(id => {
          axios.patch(url + '/incomeTable/' + id, {
            category_id: 0
          })
        }))
          .then(() => {
            context.commit('deleteCategory', incomeSelected)
          });
      });
    },

  },
  modules: {
  }
})
