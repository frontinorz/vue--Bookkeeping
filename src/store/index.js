import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import { db, docId } from "@/db";

const dbRef = db.collection("db").doc(docId);
const expenseRef = dbRef.collection("expenseTable")
const incomeRef = dbRef.collection("incomeTable")
const expenseCategoryRef = dbRef.collection("expenseCategory")
const incomeCategoryRef = dbRef.collection("incomeCategory")

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    currentDate: new Date().toISOString().substr(0, 10),
    budget: 15000,
    categoryExpense: [],
    categoryIncome: [],
    expenseTable: [],
    incomeTable: [],
    iconBank: [
      "mdi-star",
      "mdi-controller-classic",
      "mdi-movie",
      "mdi-party-popper",
      "mdi-pharmacy",
      "mdi-shopping",
      "mdi-phone-classic",
      "mdi-school",
      "mdi-home",
      "mdi-car",
      "mdi-subway-variant",
      "mdi-airplane",
      "mdi-hiking",
      "mdi-tshirt-crew",
      "mdi-coffee",
      "mdi-glass-mug-variant",
      "mdi-pasta",
      "mdi-noodles",
      "mdi-food",
      "mdi-baguette",
      "mdi-cat",
      "mdi-dog",
      "mdi-weight-lifter",
      "mdi-chart-bar",
      "mdi-sack",
      "mdi-briefcase",
      "mdi-card-bulleted",
      "mdi-cash-usd"
    ],

    isLogin: false
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
    },
    getLogin(state) {
      return state.isLogin
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
    addExpense(state, item) {
      state.expenseTable.push(item)
    },
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
    addIncome(state, item) {
      state.incomeTable.push(item)
    },
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
    },

    // Account Handler
    checkIsLogin(state) {
      state.isLogin = firebase.auth().currentUser ? true : false
    }

  },
  actions: {
    async GET_DATA(context) {
      await context.dispatch('GET_BUDGET')
      await context.dispatch('GET_INCOME_CATEGORY')
      await context.dispatch('GET_EXPENSE_CATEGORY')
      context.dispatch('GET_EXPENSE')
      context.dispatch('GET_INCOME')
    },

    // Expense handler
    GET_EXPENSE({ commit }) {
      let arr = []
      expenseRef.orderBy("date").get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let item = doc.data();
            item.id = doc.id
            arr.push(item)
          });
          commit('setExpense', arr)
        });
    },
    CREATE_EXPENSE(context, item) {
      const newItem = expenseRef.doc()
      newItem.set({
        amount: item.amount,
        descr: item.descr,
        category_id: item.category_id,
        date: item.date,
        isSpecial: item.isSpecial
      }).then(() => {
        let localItem = item
        localItem.id = newItem.id
        context.commit('addExpense', localItem)
      })
    },
    UPDATE_EXPENSE(context, item) {
      expenseRef.doc(item.id).update({
        amount: item.amount,
        descr: item.descr,
        category_id: item.category_id
      }).then(() => {
        context.commit('updateExpense', item)
      });

    },
    DELETE_EXPENSE(context, item) {
      const index = context.state.expenseTable.indexOf(item)
      if (index == -1) return false
      expenseRef
        .doc(item.id)
        .delete().then(() => {
          context.commit('deleteExpense', index)
        })
    },

    // Income handler
    GET_INCOME({ commit }) {
      let arr = []
      incomeRef.orderBy("date").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let item = doc.data()
          item.id = doc.id
          arr.push(item)
        });
        commit('setIncome', arr)
      })
    },
    CREATE_INCOME(context, item) {
      const newItem = incomeRef.doc()
      newItem.set({
        amount: item.amount,
        descr: item.descr,
        category_id: item.category_id,
        date: item.date
      }).then(() => {
        let localItem = item
        localItem.id = newItem.id
        context.commit('addIncome', localItem)
      })
    },
    UPDATE_INCOME(context, item) {
      incomeRef.doc(item.id)
        .update({
          amount: item.amount,
          descr: item.descr,
          category_id: item.category_id
        }).then(() => {
          context.commit('updateIncome', item)
        })
    },
    DELETE_INCOME(context, item) {
      let index = context.state.incomeTable.indexOf(item)
      if (index == -1) return false
      incomeRef
        .doc(item.id)
        .delete().then(() => {
          context.commit('deleteIncome', index)
        })
    },

    // Budget Handler
    GET_BUDGET({ commit }) {
      dbRef.get().then((doc) => {
        if (doc.exists) {
          commit('setBudget', doc.data().settings.budgetAmount)
        }
      })
    },
    UPDATE_BUDGET(context, amount) {
      dbRef.update(
        {
          "settings.budgetAmount": amount
        }
      ).then(() => {
        context.commit('setBudget', amount)
      })
    },

    // - Expense Category
    GET_EXPENSE_CATEGORY({ commit }) {
      let arr = []
      expenseCategoryRef.orderBy("order").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().order == 0) {
            arr.unshift(doc.data())
          } else {
            arr.push(doc.data())
          }
        });
        commit('setExpenseCategory', arr)
      })
    },
    CREATE_EXPENSE_CATEGORY(context, item) {
      const newCategory = expenseCategoryRef.doc();
      const allCategory = context.state.categoryExpense
      const lastOrder = allCategory[allCategory.length - 1].order + 1
      newCategory.set({
        title: item.title,
        icon: item.icon,
        id: newCategory.id,
        order: lastOrder
      })
        .then(function () {
          context.dispatch('GET_EXPENSE_CATEGORY')
        })
    },
    UPDATE_EXPENSE_CATEGORY(context, item) {
      expenseCategoryRef.doc(item.id)
        .update({
          title: item.title,
          icon: item.icon
        }).then(() => {
          context.dispatch('GET_EXPENSE_CATEGORY')
        });
    },
    DELETE_EXPENSE_CATEGORY(context, id) {
      expenseCategoryRef
        .doc(id)
        .delete().then(function () {
          context.dispatch('GET_EXPENSE_CATEGORY')

          // 抓出所有應用此分類 id 的物件
          let itemSelect = context.state.expenseTable
            .filter(item => item.category_id == id)
          if (itemSelect.length == 0) return

          // 取出 id
          let itemSelectId = itemSelect.map(item => item.id)

          // 建立批次送出全部的修改
          const batch = db.batch();

          itemSelectId.map(id => {
            const item = expenseRef.doc(id)
            batch.update(item, { category_id: "0" });
          })

          batch.commit().then(function () {
            context.commit('deleteCategory', itemSelect)
          })

        })
    },

    // - Income Category
    GET_INCOME_CATEGORY({ commit }) {
      let arr = []
      incomeCategoryRef.orderBy("order").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          if (doc.data().order == 0) {
            arr.unshift(doc.data())
          } else {
            arr.push(doc.data())
          }
        });
        commit('setIncomeCategory', arr)
      })
    },
    CREATE_INCOME_CATEGORY(context, item) {
      const newCategory = incomeCategoryRef.doc();
      const allCategory = context.state.categoryIncome
      const lastOrder = allCategory[allCategory.length - 1].order + 1
      newCategory.set({
        title: item.title,
        icon: item.icon,
        id: newCategory.id,
        order: lastOrder
      })
        .then(function () {
          context.dispatch('GET_INCOME_CATEGORY')
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    },
    UPDATE_INCOME_CATEGORY(context, item) {
      incomeCategoryRef.doc(item.id)
        .update({
          title: item.title,
          icon: item.icon
        }).then(() => {
          context.dispatch('GET_INCOME_CATEGORY')
        });
    },
    DELETE_INCOME_CATEGORY(context, id) {
      incomeCategoryRef
        .doc(id)
        .delete().then(function () {
          context.dispatch('GET_INCOME_CATEGORY')

          // 抓出所有應用此分類 id 的物件
          let itemSelect = context.state.incomeTable
            .filter(item => item.category_id == id)
          if (itemSelect.length == 0) return

          // 取出 id
          let itemSelectId = itemSelect.map(item => item.id)

          // 建立批次送出全部的修改
          const batch = db.batch();

          itemSelectId.map(id => {
            const item = incomeRef.doc(id)
            batch.update(item, { category_id: "0" });
          })

          batch.commit().then(function () {
            context.commit('deleteCategory', itemSelect)
          })
        })
    }
  },
  modules: {
  }
})
