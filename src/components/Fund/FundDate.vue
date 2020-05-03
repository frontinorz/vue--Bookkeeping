<template>
  <v-card>
    <v-toolbar
      class="white--text"
      dark
      :class="colorTheme"
    >
      <v-spacer></v-spacer>
      <v-btn
        large
        icon
        @click="datePrev"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-dialog
        v-model="modal"
        transition="scale-transition"
        offset-y
        width="360px"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            class="ma-2"
            v-on="on"
            text
            x-large
          >
            <!-- <v-icon
              left
              dark
            >event</v-icon> -->
            <span class="headline font-weight-bold"> {{ date }}</span>
          </v-btn>
        </template>
        <v-date-picker
          v-model="date"
          locale="zh-cn"
          scrollable
          @input="modal = false"
        ></v-date-picker>
      </v-dialog>
      <v-btn
        large
        icon
        @click="dateNext"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
    </v-toolbar>
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        modal: false
      };
    },
    computed: {
      date: {
        get() {
          return this.$store.getters["getDate"];
        },
        set(val) {
          this.$store.commit("setDate", val);
        }
      },
      colorTheme() {
        return this.$store.getters["getColorTheme"];
      }
    },
    methods: {
      datePrev() {
        this.$store.commit("controlDate", -1);
      },
      dateNext() {
        this.$store.commit("controlDate", 1);
      }
    }
  };
</script>
