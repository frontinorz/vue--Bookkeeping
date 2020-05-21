<template>
  <v-container>
    <v-card
      class="mx-auto my-12"
      max-width="500"
    >
      <v-card-title>每月預算</v-card-title>
      <v-card-text>
        <v-form v-model="validBudget">
          <v-row
            align="center"
            class="mx-0"
          >
            <v-text-field
              dense
              type="number"
              v-model.number="budget"
              :rules="amountRule"
              validate-on-blur="true"
            />
            <v-btn
              color="primary"
              class="ml-2"
              @click="updateBudget"
            >
              確認
            </v-btn>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider class="mx-4 my-2"></v-divider>
      <v-card-title>
        <span>支出分類</span>
        <v-btn
          color="primary"
          class="ml-2"
          :elevation="1"
          fab
          x-small
          dark
          @click="addExpense"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-simple-table height="200px">
          <template v-slot:default>
            <tbody>
              <tr
                v-for="item in expenseCategory"
                :key="item.id"
                v-show="item.id != 0"
              >
                <td>
                  <v-icon class="mr-2">{{ item.icon }}</v-icon>{{ item.title }}
                </td>
                <td class="text-right">
                  <v-btn
                    icon
                    @click="editExpense(item)"
                  >
                    <v-icon color="grey lighten-1">mdi-pencil-outline</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    @click="deleteExpense(item)"
                  >
                    <v-icon color="grey lighten-1">mdi-trash-can-outline</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
      <v-divider class="mx-4 my-2"></v-divider>
      <v-card-title>
        <span>收入分類</span>
        <v-btn
          color="primary"
          class="ml-2"
          :elevation="1"
          fab
          x-small
          dark
          @click="addIncome"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-simple-table height="200px">
          <template v-slot:default>
            <tbody>
              <tr
                v-for="item in incomeCategory"
                :key="item.id"
                v-show="item.id != 0"
              >
                <td>
                  <v-icon class="mr-2">{{ item.icon }}</v-icon>{{ item.title }}
                </td>
                <td class="text-right">
                  <v-btn
                    icon
                    @click="editIncome(item)"
                  >
                    <v-icon color="grey lighten-1">mdi-pencil-outline</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    @click="deleteIncome(item)"
                  >
                    <v-icon color="grey lighten-1">mdi-trash-can-outline</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
    <v-dialog
      v-model="dialogEdit"
      max-width="450"
    >
      <v-form v-model="validCategory">
        <v-card>
          <v-card-title class="blue darken-2 white--text">{{ dialogTitle }}</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  type="text"
                  label="分類名稱"
                  v-model="cateName"
                  :rules="titleRule"
                  validate-on-blur="true"
                />
              </v-col>
              <v-col cols="12">
                圖示
                <v-sheet>
                  <v-chip-group
                    mandatory
                    active-class="blue accent-4 white--text"
                    :mobile-break-point="576"
                    column
                    v-model="cateIcon"
                  >
                    <v-chip
                      class="mr-2"
                      v-for="icon in iconBank"
                      :key="icon"
                    >
                      <v-icon>{{ icon }}</v-icon>
                    </v-chip>
                  </v-chip-group>
                </v-sheet>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="categoryHandler"
            >
              確認
            </v-btn>
            <v-btn
              text
              color="error"
              @click="clearInput"
            >
              取消
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <v-dialog
      v-model="dialogDelete"
      max-width="350"
    >
      <v-card
        color="red lighten-1"
        dark
      >
        <v-card-title>
          <v-icon
            large
            left
          >
            mdi-alert-circle
          </v-icon>
          警告
        </v-card-title>
        <v-card-text class="title font-weight-bold">
          如刪除此分類，當前應用此分類的資料將統一歸納至 "未分類"
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="categoryHandler"
          >
            確認
          </v-btn>
          <v-btn
            color="grey"
            @click="dialogDelete = false"
          >
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        mode: "",
        genre: "",
        budget: this.$store.getters["getBudget"],
        dialogDelete: false,
        dialogEdit: false,
        dialogTitle: "分類修改",
        cateName: "",
        cateIcon: 0,
        cateId: 0,
        validBudget: null,
        validCategory: null,
        amountRule: [value => value > 0 || "此為必須欄位"],
        titleRule: [value => !!value || "此為必須欄位"]
      };
    },
    mounted() {
      this.$store.dispatch("GET_ICON");
    },
    computed: {
      expenseCategory() {
        return this.$store.getters["getCategoryList"]("expense");
      },
      incomeCategory() {
        return this.$store.getters["getCategoryList"]("income");
      },
      iconBank() {
        return this.$store.getters["getIcons"];
      }
    },
    methods: {
      updateBudget() {
        console.log(this.validBudget);
        if (!this.validBudget) return;
        this.$store.dispatch("UPDATE_BUDGET", this.budget);
      },
      // Category handler
      // - Create
      addCategory() {
        this.mode = "add";
        this.dialogEdit = true;
      },
      addExpense() {
        this.dialogTitle = "支出分類新增";
        this.genre = "expense";
        this.addCategory();
      },
      addIncome() {
        this.dialogTitle = "收入分類新增";
        this.genre = "income";
        this.addCategory();
      },
      async dispatchAdd() {
        if (this.genre === "expense") {
          await this.$store.dispatch("CREATE_EXPENSE_CATEGORY", {
            title: this.cateName,
            icon: this.iconBank[this.cateIcon]
          });
          this.clearInput();
        }
        if (this.genre === "income") {
          await this.$store.dispatch("CREATE_INCOME_CATEGORY", {
            title: this.cateName,
            icon: this.iconBank[this.cateIcon]
          });
          this.clearInput();
        }
      },

      // - Update
      editCategory(cate) {
        this.mode = "edit";
        this.dialogEdit = true;
        this.cateName = cate.title;
        this.cateIcon = cate.icon;
        this.cateId = cate.id;
      },
      editExpense(cate) {
        this.dialogTitle = "支出分類修改";
        this.genre = "expense";
        this.editCategory(cate);
      },
      editIncome(cate) {
        this.dialogTitle = "收入分類修改";
        this.genre = "income";
        this.editCategory(cate);
      },
      async dispatchUpdate() {
        if (this.genre === "expense") {
          await this.$store.dispatch("UPDATE_EXPENSE_CATEGORY", {
            id: this.cateId,
            title: this.cateName,
            icon: this.iconBank[this.cateIcon]
          });
          this.clearInput();
        }
        if (this.genre === "income") {
          await this.$store.dispatch("UPDATE_INCOME_CATEGORY", {
            id: this.cateId,
            title: this.cateName,
            icon: this.iconBank[this.cateIcon]
          });
          this.clearInput();
        }
      },

      // - Delete
      deleteCategory(cate) {
        this.mode = "delete";
        this.cateId = cate.id;
        this.dialogDelete = true;
      },
      deleteExpense(cate) {
        this.genre = "expense";
        this.deleteCategory(cate);
      },
      deleteIncome(cate) {
        this.genre = "income";
        this.deleteCategory(cate);
      },
      async dispatchDelete() {
        if (this.genre === "expense") {
          await this.$store.dispatch("DELETE_EXPENSE_CATEGORY", this.cateId);
          this.clearDelete();
        }
        if (this.genre === "income") {
          await this.$store.dispatch("DELETE_INCOME_CATEGORY", this.cateId);
          this.clearDelete();
        }
      },

      categoryHandler() {
        switch (this.mode) {
          case "add":
            if (!this.validCategory) break;
            this.dispatchAdd();
            break;
          case "edit":
            if (!this.validCategory) break;
            this.dispatchUpdate();
            break;
          case "delete":
            this.dispatchDelete();
            break;
          default:
            break;
        }
      },
      clearDelete() {
        this.cateId = 0;
        this.dialogDelete = false;
      },
      clearInput() {
        this.dialogTitle = "";
        this.cateIcon = 0;
        this.cateId = 0;
        this.dialogEdit = false;
      }
    }
  };
</script>

<style>
</style>