<template>
  <v-card>
    <v-card-title
      class="px-4 py-2"
      :class="colorTheme"
    >
      <span class="white--text">{{ inputMode.title }}</span>
    </v-card-title>
    <v-container>
      <v-col cols="12">
        <v-chip-group
          mandatory
          active-class="blue accent-4 white--text"
          column
          v-model=category_id
        >
          <v-chip
            class="mr-2"
            v-for="item in category"
            :key="item._id"
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
          dense
        />
      </v-col>
      <v-col cols="12">
        <v-textarea
          :placeholder="inputMode.placeholder"
          rows="1"
          prepend-icon="comment"
          v-model="descr"
          dense
        ></v-textarea>
      </v-col>
      <v-col
        cols="12"
        v-if="mode === 'expense'"
      >
        <v-checkbox
          class="mt-0"
          v-model="isSpecial"
          label="特別支出(不納入預算)"
        ></v-checkbox>
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
        amount: null,
        descr: "",
        category_id: 0,
        isSpecial: false,
        modal: false,
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
      mode() {
        return this.$store.state.route.name;
      },
      category() {
        return this.$store.getters["getCategoryList"];
      },
      inputMode() {
        return this.modeList.find(
          item => item.mode === this.$store.state.route.name
        );
      },
      colorTheme() {
        return this.$store.getters["getColorTheme"];
      }
    },
    methods: {
      categoryHandler(id) {
        this.category_id = id;
      },
      clearInput() {
        this.category_id = 0;
        this.amount = null;
        this.descr = "";
        this.isSpecial = false;
      },
      addHandler() {
        let obj = {
          amount: this.amount,
          descr: this.descr,
          category_id: this.category_id
        };
        if (this.mode === "expense") {
          if (this.isSpecial) {
            obj.isSpecial = true;
            this.$store.commit("ADD_SPECIAL", obj);
          } else {
            this.$store.commit("ADD_EXPENSE", obj);
          }
        }
        if (this.mode === "income") {
          this.$store.commit("ADD_INCOME", obj);
        }
        this.clearInput();
      }
    }
  };
</script>

<style>
</style>