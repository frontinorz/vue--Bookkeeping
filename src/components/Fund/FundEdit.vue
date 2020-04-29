<template>
  <v-card>
    <v-card-title :class="colorTheme">
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
          rows="1"
          prepend-icon="comment"
          v-model="descr"
        ></v-textarea>
      </v-col>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          @click="editHandler"
        >
          確認
        </v-btn>
        <v-btn
          text
          color="error"
          @click="closeHandler"
        >
          取消
        </v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    props: {
      target: {
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
        modal: false,
        amount: this.target.amount,
        descr: this.target.descr,
        category_id: this.target.category_id,
        modeList: [
          {
            mode: "expense",
            title: "修改支出",
            placeholder: "消費描述..."
          },
          {
            mode: "income",
            title: "修改收入",
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
      editHandler() {
        let obj = {
          amount: this.amount,
          descr: this.descr,
          category_id: this.category_id
        };
        if (this.mode === "expense") {
          if (this.target.isSpecial) {
            this.$store.commit("EDIT_SPECIAL", { id: this.id, obj: obj });
          } else {
            this.$store.commit("EDIT_EXPENSE", { id: this.id, obj: obj });
          }
        }
        if (this.mode === "income") {
          this.$store.commit("EDIT_INCOME", { id: this.id, obj: obj });
        }
        this.$emit("closeHandler");
      },
      closeHandler() {
        this.$emit("closeHandler");
      },
      refreshSelection() {
        this.amount = this.target.amount;
        this.descr = this.target.descr;
        this.category_id = this.target.category_id;
      }
    },
    watch: {
      target: function(newVal, oldVal) {
        // watch it
        this.amount = newVal.amount;
        this.descr = newVal.descr;
        this.category_id = newVal.category_id;
        console.log("Prop changed: ", newVal, " | was: ", oldVal);
      }
    }
  };
</script>

<style>
</style>