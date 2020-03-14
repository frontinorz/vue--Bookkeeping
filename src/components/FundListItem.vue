<template>
  <v-list-item>
    <v-list-item-icon>
      <v-icon>{{ categoryIcon(cost._id) }}</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>{{ categoryTitle(cost._id) }}</v-list-item-title>
      <v-list-item-subtitle>
        <pre>{{ cost.descr }}</pre>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-list-item-action-text class="subtitle-2 text-right m-l-auto">{{ cost.amount }}</v-list-item-action-text>
      <v-col class="pa-0">
        <v-btn icon>
          <v-icon color="grey lighten-1">mdi-pencil-outline</v-icon>
        </v-btn>
        <v-dialog
          v-model="dialog"
          max-width="290"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              icon
            >
              <v-icon color="grey lighten-1">mdi-trash-can-outline</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline">確定要刪除此筆消費 ?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                text
                @click="dialog = false"
              >取消</v-btn>
              <v-btn
                color="green darken-1"
                text
                @click="dialog = false"
              >確認</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-col>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
  export default {
    props: {
      cost: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        dialog: false
      };
    },
    methods: {
      categoryIcon(id) {
        return this.$store.getters["categoryIcon"](id);
      },
      categoryTitle(id) {
        return this.$store.getters["categoryTitle"](id);
      },
      deleteHandler() {}
    }
  };
</script>