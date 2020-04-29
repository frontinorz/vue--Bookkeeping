<template>
  <v-container>
    <v-row class="fill-height">
      <v-col cols="12">
        <v-sheet height="64">
          <v-toolbar
            flat
            color="white"
          >
            <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="setToday"
            >
              今日
            </v-btn>
            <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="prev"
            >
              <v-icon small>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="next"
            >
              <v-icon small>mdi-chevron-right</v-icon>
            </v-btn>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="500">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :now="today"
            type="month"
            locale="zh-tw"
            @click:event="fundLink"
            @change="updateRange"
          ></v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-card-title
          class="justify-md-end align-end mr-md-2 font-weight-bold pa-1"
          :class="[monthBalance < 0 ? 'red--text': 'grey--text text--darken-1' ]"
        >
          當月預算
          <v-icon
            class="align-self-center"
            :class="[monthBalance < 0 ? 'red--text': 'grey--text text--darken-1' ]"
          >
            attach_money
          </v-icon>
          <span class="display-1 lh-1 font-weight-bold pr-2">
            {{ numberFormat(monthBalance) }}
          </span>
          / {{ numberFormat(monthBudget) }}

        </v-card-title>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-card-title class="ml-md-2 grey--text text--darken-1 font-weight-bold pa-1 ">
          當月特支
          <v-icon class="grey--text text--darken-1">
            attach_money
          </v-icon>
          <span class="display-1 lh-1 font-weight-bold pr-2">
            {{ numberFormat(monthSpecialExpense) }}
          </span>
        </v-card-title>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-card style="min-height:200px;">
          <v-card-title class="font-weight-bold red--text justify-center pb-0">
            當月支出
            <v-icon class="red--text">attach_money</v-icon>
            {{ numberFormat(monthExpense) }}
          </v-card-title>
          <HorizontalBarChart
            style="min-height:300px;"
            :seriesData="expenseChartData"
          />
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-card style="min-height:200px;">
          <v-card-title class="font-weight-bold teal--text justify-center pb-0">
            當月收入
            <v-icon class="teal--text">attach_money</v-icon>
            {{ numberFormat(monthIncome) }}
          </v-card-title>
          <HorizontalBarChart
            style="min-height:300px;"
            :seriesData="incomeChartData"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import HorizontalBarChart from "@/components/Charts/HorizontalBarChart.vue";

  export default {
    components: {
      HorizontalBarChart
    },
    data: () => ({
      today: new Date().toISOString().substr(0, 10),
      focus: new Date().toISOString().substr(0, 10),
      type: "month",
      start: null,
      end: null,
      currentlyEditing: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      color: "#ffffff",
      names: [
        "blue",
        "indigo",
        "deep-purple",
        "cyan",
        "green",
        "orange",
        "grey darken-1"
      ],
      dialog: false,
      colorDialog: false,
      datePickerStart: false,
      datePickerEnd: false,
      loading: false
    }),
    mounted() {
      this.getEvents();
    },
    computed: {
      title() {
        const { start, end } = this;
        if (!start || !end) {
          return "";
        }

        const startMonth = this.monthFormatter(start);
        const endMonth = this.monthFormatter(end);
        // const suffixMonth = startMonth === endMonth ? "" : endMonth;

        const startYear = start.year + "年";
        const endYear = end.year;
        // const suffixYear = startYear === endYear ? "" : endYear;

        const startDay = start.day + "日";
        const endDay = end.day + "日";

        switch (this.type) {
          case "month":
            return `${startYear} ${startMonth}`;
          case "week":
          case "4day":
            return `${startYear} ${startMonth} ${startDay}  - ${endYear} ${endMonth} ${endDay} `;
          case "day":
            return `${startYear} ${startMonth} ${startDay}`;
        }
        return "";
      },
      monthFormatter() {
        return this.$refs.calendar.getFormatter({
          timeZone: "UTC",
          month: "long"
        });
      },
      expenseChartData() {
        const table = this.$store.getters["getMonthTable"]("expense");
        const category = this.$store.state.categoryExpense;
        let data = this.getDataByCategory(table, category);

        return Object.entries(data)
          .sort((a, b) => (a[1] > b[1] ? 1 : -1))
          .map(item => item.reverse());
      },
      incomeChartData() {
        const table = this.$store.getters["getMonthTable"]("income");
        const category = this.$store.state.categoryIncome;
        let data = this.getDataByCategory(table, category);

        return Object.entries(data)
          .sort((a, b) => (a[1] > b[1] ? 1 : -1))
          .map(item => item.reverse());
      },
      monthIncome() {
        return this.$store.getters["getMonthIncomeTotal"];
      },
      monthExpense() {
        return this.$store.getters["getMonthExpenseTotal"];
      },
      monthSpecialExpense() {
        return this.$store.getters["getMonthSpecialTotal"];
      },
      monthBudget() {
        return this.$store.getters["getBudget"];
      },
      monthBalance() {
        return this.monthBudget - this.monthExpense;
      }
    },
    methods: {
      getEvents() {
        let table = this.$store.state.table;
        table.forEach(item => {
          if (item.expenseTable.length) {
            let sum = item.expenseTable.reduce((total, current) => {
              return total + current.amount;
            }, 0);

            let event = {
              start: item.date,
              end: item.date,
              name: `${this.numberFormat(sum)}$`,
              type: "expense",
              color: "#EF5350"
            };

            this.events.push(event);
          }
          if (item.specialTable) {
            let sum = item.specialTable.reduce((total, current) => {
              return total + current.amount;
            }, 0);

            let event = {
              start: item.date,
              end: item.date,
              name: `${this.numberFormat(sum)}$`,
              type: "expense",
              color: "#FF9800"
            };

            this.events.push(event);
          }
          if (item.incomeTable.length) {
            let sum = item.incomeTable.reduce((total, current) => {
              return total + current.amount;
            }, 0);

            let event = {
              start: item.date,
              end: item.date,
              name: `${this.numberFormat(sum)}$`,
              type: "income",
              color: "#009688"
            };

            this.events.push(event);
          }
        });
      },
      getEventColor(event) {
        return event.color;
      },
      setToday() {
        this.focus = this.today;
      },
      prev() {
        this.$refs.calendar.prev();
      },
      next() {
        this.$refs.calendar.next();
      },
      updateRange({ start, end }) {
        this.start = start;
        this.end = end;
        // Get month data

        // this.$store.commit("SET_DATE", this.start.date);
      },
      fundLink({ nativeEvent, event }) {
        if (event.type === "expense") {
          this.$router.push({ name: "expense", params: { date: event.start } });
        }
        if (event.type === "income") {
          this.$router.push({ name: "income", params: { date: event.start } });
        }
        nativeEvent.stopPropagation();
      },
      getDataByCategory(table, category) {
        let tableCate = table.reduce((obj, item) => {
          let cate = category.find(el => el._id == item.category_id).title;
          if (!obj[cate]) {
            obj[cate] = 0;
          }
          obj[cate] += item.amount;
          return obj;
        }, {});

        return tableCate;
      },
      numberFormat(num) {
        return new Intl.NumberFormat("en-US").format(num);
      }
    }
  };
</script>

<style lang="scss">
  .v-calendar {
    .v-event {
      text-align: right;
      padding-right: 5px;
    }
  }
  .lh-1 {
    line-height: 1 !important;
  }
</style>