<template>
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
    <HorizontalBarChart />
  </v-row>
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
              name: `支出 ${sum}$`,
              type: "expense",
              color: "#EF5350"
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
              name: `收入 ${sum}$`,
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
      },
      fundLink({ nativeEvent, event }) {
        console.log(event.type);
        if (event.type === "expense") {
          this.$router.push({ name: "expense", params: { date: event.start } });
        }
        if (event.type === "income") {
          this.$router.push({ name: "income", params: { date: event.start } });
        }
        nativeEvent.stopPropagation();
      }
    }
  };
</script>

<style>
</style>