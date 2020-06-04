<template>
  <v-container fluid>
    <v-card>
      <v-row class="fill-height mb-2">
        <v-col
          class="py-0"
          cols="12"
          md="4"
        >
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
        </v-col>
        <v-col
          class="py-0 d-flex text-right justify-end"
          cols="12"
          md="8"
        >
          <v-card
            :elevation=0
            class="px-2"
          >
            <v-card-title
              class="pb-0 pt-1 justify-end"
              :class="titleFontSize"
            ><span class="font-custom">預算餘額</span></v-card-title>
            <v-card-text
              class="pb-0"
              :class="titleFontSize"
            >
              <span class="pr-1">
                {{ numberFormat(monthBalance) }}
              </span>
              / {{ numberFormat(monthBudget) }}
            </v-card-text>
          </v-card>
          <v-card
            :elevation=0
            class="px-2"
          >
            <v-card-title
              class="pb-0 pt-1 justify-end"
              :class="titleFontSize"
            ><span class="font-custom">當月支出</span></v-card-title>
            <v-card-text
              class="pb-0"
              :class="titleFontSize"
            >
              <span class="pr-1">
                {{ numberFormat(monthExpense) }}
              </span>
            </v-card-text>
          </v-card>
          <v-card
            :elevation=0
            class="px-2"
          >
            <v-card-title
              class="pb-0 pt-1 justify-end"
              :class="titleFontSize"
            ><span class="font-custom">當月特支</span></v-card-title>
            <v-card-text
              class="pb-0"
              :class="titleFontSize"
            >
              <span class="pr-1">
                {{ numberFormat(monthSpecialExpense) }}
              </span>
            </v-card-text>
          </v-card>
          <v-card
            :elevation=0
            class="px-2"
          >
            <v-card-title
              class="pb-0 pt-1 justify-end"
              :class="titleFontSize"
            ><span class="font-custom">當月收入</span></v-card-title>
            <v-card-text
              class="pb-0"
              :class="titleFontSize"
            >
              <span class="pr-1">
                {{ numberFormat(monthIncome) }}
              </span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          class="pb-0"
          cols="12"
        >
          <v-sheet min-height="500">
            <v-calendar
              ref="calendar"
              v-model="focus"
              color="cyan darken-1"
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
    </v-card>
    <v-row class="align-stretch">
      <v-col
        cols="12"
        md="6"
        v-if="expenseChartData.length"
      >
        <v-card style="min-height:200px;height:100%">
          <v-card-text class="pa-0">
            <v-card-title class="pb-0 pl-6 font-weight-bold">
              支出分類
            </v-card-title>
            <HorizontalBarChart
              style="min-height:300px;"
              :seriesData="expenseChartData"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
        v-if="incomeChartData.length"
      >
        <v-card style="min-height:200px;height:100%">
          <v-card-text class="pa-0">
            <v-card-title class="pb-0 pl-6 font-weight-bold">
              收入分類
            </v-card-title>
            <HorizontalBarChart
              style="min-height:300px;"
              :seriesData="incomeChartData"
            />
          </v-card-text>
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
      colorExpense: "#FF5252",
      colorIncome: "#26A69A",
      colorSpecial: "#FF9800",
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
      },

      titleFontSize() {
        return this.$vuetify.breakpoint.xs ? "subtitle-1 px-1" : "title";
      }
    },
    methods: {
      getEvents() {
        let expenseTable = {};
        let specialTable = {};
        let incomeTable = {};

        // Translate data into {date: sum of daliy amount} pair
        this.$store.state.expenseTable.forEach(item => {
          if (!item.isSpecial) {
            if (!expenseTable[item.date]) expenseTable[item.date] = 0;
            expenseTable[item.date] += item.amount;
          } else {
            if (!specialTable[item.date]) specialTable[item.date] = 0;
            specialTable[item.date] += item.amount;
          }
        });

        incomeTable = this.$store.state.incomeTable.reduce((obj, item) => {
          if (!obj[item.date]) obj[item.date] = 0;
          obj[item.date] += item.amount;
          return obj;
        }, {});

        expenseTable = Object.entries(expenseTable);
        specialTable = Object.entries(specialTable);
        incomeTable = Object.entries(incomeTable);

        // Create event
        expenseTable.forEach((item, index) => {
          let event = {
            start: expenseTable[index][0],
            end: expenseTable[index][0],
            name: `${this.numberFormat(expenseTable[index][1])}$`,
            type: "expense",
            color: this.colorExpense
          };

          this.events.push(event);
        });

        specialTable.forEach((item, index) => {
          let event = {
            start: specialTable[index][0],
            end: specialTable[index][0],
            name: `${this.numberFormat(specialTable[index][1])}$`,
            type: "expense",
            color: this.colorSpecial
          };
          this.events.push(event);
        });

        incomeTable.forEach((item, index) => {
          let event = {
            start: incomeTable[index][0],
            end: incomeTable[index][0],
            name: `${this.numberFormat(incomeTable[index][1])}$`,
            type: "income",
            color: this.colorIncome
          };

          this.events.push(event);
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
        this.$store.commit("setDate", start.date);
      },
      fundLink({ nativeEvent, event }) {
        if (event.type === "expense") {
          this.$router.push({ name: "expense" });
        }
        if (event.type === "income") {
          this.$router.push({ name: "income" });
        }
        this.$store.commit("setDate", event.start);
        nativeEvent.stopPropagation();
      },
      getDataByCategory(table, category) {
        let tableCate = table.reduce((obj, item) => {
          let cate = category.find(el => {
            return el.id == item.category_id;
          });
          if (!obj[cate.title]) {
            obj[cate.title] = 0;
          }
          obj[cate.title] += item.amount;
          return obj;
        }, {});

        return tableCate;
      },
      numberFormat(num) {
        return new Intl.NumberFormat("en-US").format(num);
      },
      getColor(amount) {
        if (amount <= 0) {
          return "red--text";
        } else {
          return "grey--text text--darken-1";
        }
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
  .v-calendar.v-calendar-events .v-calendar-weekly__day {
    min-height: 80px;
  }
  .font-custom {
    font-family: "Roboto", sans-serif, "微軟正黑體" !important;
    @media screen and (max-width: 600px) {
      font-size: 14px;
    }
  }
</style>