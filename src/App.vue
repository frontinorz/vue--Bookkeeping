<template>
  <v-app>
    <v-navigation-drawer
      v-if="isLogin"
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      :width="220"
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
      <v-app-bar-nav-icon
        v-show="isLogin"
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span>Vue 記帳</span>
      </v-toolbar-title>
      <v-spacer />
      <v-menu offset-y>
        <template
          v-slot:activator="{ on }"
          class="ml-4"
        >
          <v-btn
            icon
            large
            v-on="on"
            v-show="isLogin"
          >
            <v-avatar
              size="32px"
              item
            >
              <v-icon>mdi-account</v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item @click="logoutHandler">
            <v-list-item-icon class="mr-3">
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                登出
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
  import firebase from "firebase/app";
  import "firebase/auth";
  export default {
    props: {
      source: String
    },
    data: () => ({
      dialog: false,
      drawer: true,
      item: 0
    }),
    created() {
      this.$store.commit("checkIsLogin");
      if (firebase.auth().currentUser) {
        this.$store.dispatch("GET_DATA");
      }
    },
    mounted() {
      this.setToday;
    },
    computed: {
      isLogin() {
        return this.$store.getters["getLogin"];
      }
    },
    methods: {
      setToday() {
        this.$store.commit("setDate", new Date().toISOString().substr(0, 10));
      },
      logoutHandler() {
        firebase
          .auth()
          .signOut()
          .then(() => {
            this.$router.push("/login");
            this.$store.commit("checkIsLogin");
          });
      }
    }
  };
</script>

<style lang="scss">
  a {
    text-decoration: none;
  }
  .v-application .v-list-item__title a {
    color: inherit;
  }
</style>