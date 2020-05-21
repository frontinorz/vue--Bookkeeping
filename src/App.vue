<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list>
        <v-list-item-group
          v-model="item"
          color="cyan darken-1"
        >
          <v-list-item
            to="/expense"
            @click="setToday"
          >
            <v-list-item-icon>
              <v-icon>mdi-cash-minus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                支出
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            to="/income"
            @click="setToday"
          >
            <v-list-item-icon>
              <v-icon>mdi-cash-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                收入
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            to="/calender"
            @click="setToday"
          >
            <v-list-item-icon>
              <v-icon>mdi-calendar-month</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>收支月曆</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/state">
            <v-list-item-icon>
              <v-icon>mdi-chart-bar</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>年度分析</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/setting">
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>設定</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="cyan darken-1"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">Vue 記帳</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        icon
        large
      >
        <v-avatar
          size="32px"
          item
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          />
        </v-avatar>
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String
    },
    data: () => ({
      dialog: false,
      drawer: null,
      item: 0
    }),
    mounted() {
      this.$store.dispatch("GET_DATA");
      this.setToday;
    },
    methods: {
      setToday() {
        this.$store.commit("setDate", new Date().toISOString().substr(0, 10));
      }
    }
  };
</script>

<style lang="scss">
  #app {
    font-family: "Roboto", sans-serif, "微軟正黑體";
  }
  a {
    text-decoration: none;
  }
  .v-application .v-list-item__title a {
    color: inherit;
  }
</style>