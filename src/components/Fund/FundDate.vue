<template>
  <v-dialog
    v-model="modal"
    transition="scale-transition"
    offset-y
    width="360px"
  >
    <template v-slot:activator="{ on }">
      <v-card v-on="on">
        <v-card-title
          class="white--text"
          :class="colorTheme"
        >
          <v-icon
            left
            dark
          >event</v-icon>
          <span> {{ date }}</span>
        </v-card-title>
      </v-card>
    </template>
    <v-date-picker
      v-model="date"
      locale="zh-cn"
      scrollable
      autosave
    ></v-date-picker>
  </v-dialog>
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
          this.$store.commit("SET_DATE", val);
        }
      },
      colorTheme() {
        return this.$store.getters["getColorTheme"];
      }
    }
  };
</script>
