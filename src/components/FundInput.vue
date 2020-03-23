<template>
  <v-card>
    <v-card-title class="blue darken-1">
      <span class="white--text">{{ inputMode.title }}</span>
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
          v-model.number="amount"
        />
      </v-col>

      <v-col cols="12">
        <v-textarea
          :placeholder="inputMode.placeholder"
          rows="3"
          prepend-icon="comment"
          v-model="descr"
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
</template>

<script>
  export default {
    data() {
      return {
        modal: false,
        amount: null,
        descr: "",
        category_id: 1,
        modeList: [
          {
            mode: "expense",
            title: "新增支出",
            placeholder: "消費描述..."
          },
          {
            mode: "income",
            title: "新增收入",
            placeholder: "收入描述..."
          }
        ]
      };
    },
    computed: {
      status() {
        return this.$store.state.status;
      },
      category() {
        return this.$store.getters["getCategoryList"];
      },
      inputMode() {
        return this.modeList.find(
          item => item.mode === this.$store.state.route.name
        );
      }
    },
    methods: {
      categoryHandler(id) {
        this.category_id = id;
      },
      addHandler() {
        let obj = {
          amount: this.amount,
          descr: this.descr,
          category_id: this.category_id
        };
        this.$store.commit("ADD_ITEM", obj);
      }
    }
  };
</script>

<style>
</style>