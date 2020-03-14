<template>
  <v-col
    cols="6"
    sm="12"
    md="6"
  >
    <v-card>
      <v-card-title class="blue darken-1">
        <span class="white--text">新增支出</span>
      </v-card-title>
      <v-container>
        <v-col cols="12">
          <v-chip-group
            active-class="deep-purple accent-4 white--text"
            column
          >
            <v-chip
              class="mr-2"
              v-for="item in category"
              :key="item._id"
              @click="categoryHandler(item._id)"
            >
              <v-icon>{{ item.icon }}</v-icon>
              <span>{{ item.title }}</span>
            </v-chip>
          </v-chip-group>
        </v-col>
        <v-col cols="12">
          <v-text-field
            type="number"
            prepend-icon="mdi-currency-usd"
            placeholder="0"
            v-model.number="cost.amount"
          />
        </v-col>

        <v-col cols="12">
          <v-textarea
            placeholder="消費描述..."
            rows="3"
            prepend-icon="comment"
            v-model="cost.descr"
          ></v-textarea>
        </v-col>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="addHandler"
          >
            確認
          </v-btn>
          <v-btn
            text
            color="error"
          >
            取消
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-col>
</template>

<script>
  export default {
    props: {
      category: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        modal: false,
        cost: {
          date: new Date().toISOString().substr(0, 10),
          amount: null,
          descr: "",
          category_id: 1
        }
      };
    },
    methods: {
      categoryHandler(id) {
        this.cost.category_id = id;
      },
      addHandler() {
        this.$emit("addHandler", this.cost);
      }
    }
  };
</script>

<style>
</style>