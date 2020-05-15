<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mb-3">
          <v-row class="px-2 justify-space-between">
            <v-col
              class="d-flex align-baseline"
              cols="12"
              md="6"
            >
              <div class="blue--text px-2 py-1 text-capitalize font-weight-medium">選擇年份</div>
              <div class="ml-2">
                <v-autocomplete
                  :items="allYears"
                  v-model="year"
                ></v-autocomplete>
              </div>
            </v-col>
            <v-col
              class="d-flex justify-md-end"
              cols="12"
              md="6"
            >
              <v-card
                :elevation=0
                class="px-2 text-right"
              >
                <v-card-title class="py-0 justify-end">年度支出</v-card-title>
                <v-card-text class="title pb-0">{{numberFormat(expenseYearly)}}</v-card-text>
              </v-card>
              <v-card
                :elevation=0
                class="px-2 text-right"
              >
                <v-card-title class="py-0 justify-end">年度收入</v-card-title>
                <v-card-text class="title pb-0">{{numberFormat(incomeYearly)}}</v-card-text>
              </v-card>
              <v-card
                :elevation=0
                class="px-2 text-right"
              >
                <v-card-title class="py-0 justify-end">年度收支</v-card-title>
                <v-card-text
                  class="title pb-0"
                  :class="getColor(balanceYearly)"
                >{{numberFormat(balanceYearly)}}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="5"
              >
                <v-data-table
                  :headers="tableHeaders"
                  :items="dataTable"
                  :disable-pagination="true"
                  :hide-default-footer="true"
                >
                  <template v-slot:item.expense="{ item }">
                    <span>{{ numberFormat(item.expense)}}</span>
                  </template>
                  <template v-slot:item.income="{ item }">
                    <span>{{ numberFormat(item.income)}}</span>
                  </template>
                  <template v-slot:item.special="{ item }">
                    <span>{{ numberFormat(item.special)}}</span>
                  </template>
                  <template v-slot:item.balance="{ item }">
                    <span :class="getColor(item.balance)">{{ numberFormat(item.balance)}}</span>
                  </template>
                  <template v-slot:item.budget="{ item }">
                    <span :class="getColor(item.budget)">{{ numberFormat(item.budget)}}</span>
                  </template>

                </v-data-table>
              </v-col>
              <v-col
                cols="12"
                md="7"
              >
                <StackChart :seriesData="dataChartByMonth" />
              </v-col>

            </v-row>
          </v-container>
        </v-card>
        <v-card
          class="mb-3"
          v-if="expenseByCatogory"
        >
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="6"
              >
                <v-card-title class="pt-0 font-weight-bold">支出分類</v-card-title>
                <HorizontalBarChart
                  style="min-height:300px;"
                  :seriesData="expenseCatogoryBarChart"
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <PieChart :seriesData="expenseCatogoryPieChart" />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-card
          class="mb-3"
          v-if="incomeByCatogory"
        >
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="6"
              >
                <v-card-title class="pt-0 font-weight-bold">收入分類</v-card-title>
                <HorizontalBarChart
                  style="min-height:300px;"
                  :seriesData="incomeCatogoryBarChart"
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >

                <PieChart :seriesData="incomeCatogoryPieChart" />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import StackChart from "@/components/Charts/StackChart.vue";
  import PieChart from "@/components/Charts/PieChart.vue";
  import HorizontalBarChart from "@/components/Charts/HorizontalBarChart.vue";

  export default {
    components: { StackChart, PieChart, HorizontalBarChart },
    data: () => ({
      year: new Date().toISOString().substr(0, 4),
      monthText: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ],
      tableHeaders: [
        {
          text: "月份",
          align: "start",
          value: "month"
        },
        { text: "收入", value: "income" },
        { text: "支出", value: "expense" },
        { text: "特支", value: "special" },
        { text: "預算平衡", value: "budget" },
        { text: "收支平衡", value: "balance" }
      ]
    }),
    computed: {
      // By month
      expenseEachMonth() {
        let data = this.$store.state.expenseTable;
        let yearExpense = {};
        let yearSpecial = {};

        data.forEach(item => {
          if (!item.isSpecial) {
            if (!yearExpense[item.date.substr(0, 4)]) {
              yearExpense[item.date.substr(0, 4)] = Array.apply(
                null,
                Array(12)
              ).map(() => 0);
            }
            yearExpense[item.date.substr(0, 4)][
              parseInt(item.date.substr(5, 2)) - 1
            ] += item.amount;
          } else {
            if (!yearSpecial[item.date.substr(0, 4)]) {
              yearSpecial[item.date.substr(0, 4)] = Array.apply(
                null,
                Array(12)
              ).map(() => 0);
            }
            yearSpecial[item.date.substr(0, 4)][
              parseInt(item.date.substr(5, 2)) - 1
            ] += item.amount;
          }
        });

        return {
          yearExpense: yearExpense,
          yearSpecial: yearSpecial
        };
      },
      incomeEachMonth() {
        let data = this.$store.state.incomeTable;
        let yearIncome = {};

        data.forEach(item => {
          if (!yearIncome[item.date.substr(0, 4)]) {
            yearIncome[item.date.substr(0, 4)] = Array.apply(null, Array(12)).map(
              () => 0
            );
          }
          yearIncome[item.date.substr(0, 4)][
            parseInt(item.date.substr(5, 2)) - 1
          ] += item.amount;
        });

        return yearIncome;
      },
      allYears() {
        const expenseYear = Object.keys(this.expenseEachMonth.yearExpense);
        const specialYear = Object.keys(this.expenseEachMonth.yearSpecial);
        const incomeYeasr = Object.keys(this.incomeEachMonth);

        const arr = []
          .concat(expenseYear)
          .concat(specialYear)
          .concat(incomeYeasr);

        const yearList = arr
          .reduce(function(arr, year) {
            if (arr.indexOf(year) < 0) arr.push(year);
            return arr;
          }, [])
          .sort((a, b) => (parseInt(a) > parseInt(b) ? 1 : -1));

        return yearList;
      },
      dataTable() {
        let years = this.allYears;
        let table = {};
        for (let i = 0; i < years.length; i++) {
          table[years[i]] = [];
          for (let j = 0; j < 12; j++) {
            let income = this.incomeEachMonth[years[i]]
              ? this.incomeEachMonth[years[i]][j]
              : 0;
            let expense = this.expenseEachMonth.yearExpense[years[i]]
              ? this.expenseEachMonth.yearExpense[years[i]][j]
              : 0;
            let special = this.expenseEachMonth.yearExpense[years[i]]
              ? this.expenseEachMonth.yearSpecial[years[i]][j]
              : 0;

            let data = {
              month: this.monthText[j],
              income: income,
              expense: expense,
              special: special,
              budget: this.budget - expense,
              balance: income - expense - special
            };

            table[years[i]].push(data);
          }
        }

        return table[this.year];
      },
      dataChartByMonth() {
        let expense = [],
          special = [],
          income = [];

        this.dataTable.forEach(item => {
          expense.push(item.expense);
          special.push(item.special);
          income.push(item.income);
        });

        return [
          {
            name: "一般支出",
            type: "bar",
            stack: "支出",
            data: expense
          },
          {
            name: "特別支出",
            type: "bar",
            stack: "支出",
            data: special
          },
          {
            name: "收入",
            type: "bar",
            data: income
          }
        ];
      },
      budget() {
        return this.$store.getters["getBudget"];
      },
      expenseYearly() {
        let amount = this.dataTable.map(item => {
          return item.expense + item.special;
        });

        return amount.reduce((sum, item) => (sum += item));
      },
      incomeYearly() {
        let amount = this.dataTable.map(item => {
          return item.income;
        });

        return amount.reduce((sum, item) => (sum += item));
      },
      balanceYearly() {
        return this.incomeYearly - this.expenseYearly;
      },

      // By catagory
      expenseByCatogory() {
        let dataCatagory = this.dataByCategory(
          this.$store.state.expenseTable,
          "expense"
        );
        return dataCatagory[this.year];
      },
      expenseCatogoryBarChart() {
        return this.dataBarChart(this.expenseByCatogory);
      },
      expenseCatogoryPieChart() {
        return this.dataPieChart(this.expenseByCatogory);
      },

      incomeByCatogory() {
        let dataCatagory = this.dataByCategory(
          this.$store.state.incomeTable,
          "income"
        );
        return dataCatagory[this.year];
      },
      incomeCatogoryBarChart() {
        return this.dataBarChart(this.incomeByCatogory);
      },
      incomeCatogoryPieChart() {
        return this.dataPieChart(this.incomeByCatogory);
      }
    },
    methods: {
      getColor(amount) {
        if (amount <= 0) return "red--text";
      },
      numberFormat(num) {
        return new Intl.NumberFormat("en-US").format(num);
      },
      dataByCategory(table, genere) {
        if (!table.length) return;

        let dataCatagory = {};

        table.forEach(item => {
          let cata = this.$store.getters["getCategoryItem"](genere)(
            item.category_id
          ).title;

          if (!dataCatagory[item.date.substr(0, 4)])
            dataCatagory[item.date.substr(0, 4)] = {};
          if (!dataCatagory[item.date.substr(0, 4)][cata])
            dataCatagory[item.date.substr(0, 4)][cata] = 0;
          dataCatagory[item.date.substr(0, 4)][cata] += item.amount;
        });

        return dataCatagory;
      },
      dataBarChart(data) {
        if (!data) return;

        return Object.entries(data)
          .sort((a, b) => (a[1] > b[1] ? 1 : -1))
          .map(item => item.reverse());
      },
      dataPieChart(data) {
        if (!data) return;

        let pieData = [];

        for (let item in data) {
          pieData.push({
            name: item,
            value: data[item]
          });
        }

        return pieData.sort((a, b) => (a.value > b.value ? 1 : -1));
      }
    }
  };
</script>

<style>
</style>