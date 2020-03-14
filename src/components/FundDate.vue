<template>
  <v-col cols="12">
    <v-dialog
      v-model="modal"
      transition="scale-transition"
      offset-y
      width="360px"
    >
      <template v-slot:activator="{ on }">
        <v-card v-on="on">
          <v-card-title class="blue darken-1 white--text">
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

  </v-col>
</template>

<script>
  export default {
    data() {
      return {
        modal: false,
        date: new Date().toISOString().substr(0, 10)
      };
    }
  };
</script>
