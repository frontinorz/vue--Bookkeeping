<template>
  <v-list-item>
    <v-list-item-icon>
      <v-icon>{{ categoryIcon(cost.category_id) }}</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>{{ categoryTitle(cost.category_id) }}</v-list-item-title>
      <v-list-item-subtitle>
        <pre>{{ cost.descr }}</pre>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-list-item-action-text class="subtitle-2 text-right m-l-auto">{{ cost.amount }}</v-list-item-action-text>
      <v-col class="pa-0">
        <v-dialog
          v-model="dialogEdit"
          max-width="600"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              v-on="on"
            >
              <v-icon color="grey lighten-1">mdi-pencil-outline</v-icon>
            </v-btn>
          </template>
          <FundEdit
            :mode="inputMode"
            :target="cost"
            :id="id"
            @closeHandler="closeHandler"
          />
        </v-dialog>

        <v-dialog
          v-model="dialogDelete"
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
                @click="dialogDelete = false"
              >取消</v-btn>
              <v-btn
                color="green darken-1"
                text
                @click="deleteHandler"
              >確認</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-col>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
  import FundEdit from "@/components/FundEdit";

  export default {
    components: {
      FundEdit
    },
    props: {
      cost: {
        type: Object,
        required: true
      },
      id: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        dialogEdit: false,
        dialogDelete: false
      };
    },
    computed: {
      inputMode() {
        if (this.$store.state.status == "expense") {
          return "editCost";
        } else {
          return "none";
        }
      }
    },
    methods: {
      categoryIcon(id) {
        return this.$store.getters["categoryIcon"](id);
      },
      categoryTitle(id) {
        return this.$store.getters["categoryTitle"](id);
      },
      deleteHandler() {
        this.$store.commit("DELETE_COST", this.id);
        this.dialogDelete = false;
      },
      closeHandler() {
        this.dialogEdit = false;
      }
    }
  };
</script>