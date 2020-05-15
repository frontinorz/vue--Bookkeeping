<template>
  <div>
    <v-card>
      <v-card-title
        class="px-4 py-2"
        :class="colorTheme"
      >
        <span class="white--text">{{ title? title : modeText.title }}</span>
      </v-card-title>
      <v-container>
        <v-list
          three-line
          class="subtitle-one-line"
        >
          <template v-if="itemList.length">
            <v-list-item-group active-class="pink--text">
              <FundListItem
                v-for="item in itemList"
                :key="item.id"
                :item="item"
              >
                <template>
                  <v-btn
                    icon
                    @click="editDialogTrigger(item)"
                  >
                    <v-icon color="grey lighten-1">mdi-pencil-outline</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    @click="deleteDialogTrigger(item)"
                  >
                    <v-icon color="grey lighten-1">mdi-trash-can-outline</v-icon>
                  </v-btn>
                </template>
              </FundListItem>
              <v-divider></v-divider>
            </v-list-item-group>
            <v-list-item style="min-height:60px;">
              <v-list-item-icon class="my-0">
                <v-icon></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>共計</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action class="align-self-center">
                <v-list-item-action-text class="subtitle-2 pr-1">{{ feeSum }}</v-list-item-action-text>
              </v-list-item-action>
            </v-list-item>
          </template>
          <template v-else>
            {{ modeText.textNoItem }}
          </template>
        </v-list>
      </v-container>
    </v-card>
    <v-dialog
      v-model="dialogEdit"
      max-width="450"
    >
      <FundEdit
        :target="selectedItem"
        :id="selectedId"
        ref="editRef"
        @closeHandler="dialogEdit = false"
      />
    </v-dialog>
    <v-dialog
      v-model="dialogDelete"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">{{ modeText.textDelete }}</v-card-title>
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
  </div>
</template>

<script>
  import FundListItem from "@/components/Fund/FundListItem";
  import FundEdit from "@/components/Fund/FundEdit";

  export default {
    props: {
      itemList: {
        type: Array
      },
      title: {
        type: String
      }
    },
    components: {
      FundListItem,
      FundEdit
    },
    data() {
      return {
        selectedId: null,
        selectedItem: {},
        dialogEdit: false,
        dialogDelete: false,
        modeList: [
          {
            mode: "expense",
            title: "支出明細",
            titleRoutine: "固定支出",
            textNoItem: "目前沒有支出資料!",
            textDelete: "確定要刪除此筆支出?"
          },
          {
            mode: "income",
            title: "收入明細",
            titleRoutine: "固定收入",
            textNoItem: "目前沒有收入資料!",
            textDelete: "確定要刪除此筆收入?"
          }
        ]
      };
    },
    computed: {
      mode() {
        return this.$store.state.route.name;
      },
      colorTheme() {
        return this.$store.getters["getColorTheme"];
      },
      modeText() {
        return this.modeList.find(
          item => item.mode === this.$store.state.route.name
        );
      },
      feeSum() {
        if (!this.itemList.length) return;
        return this.itemList.map(item => item.amount).reduce((a, b) => a + b);
      }
    },
    methods: {
      editDialogTrigger(item) {
        this.selectedItem = item;
        this.selectedId = item.id;
        this.dialogEdit = true;
      },
      deleteDialogTrigger(item) {
        this.selectedItem = item;
        this.selectedId = item.id;
        this.dialogDelete = true;
      },
      async deleteHandler() {
        if (this.mode === "expense") {
          await this.$store.dispatch("DELETE_EXPENSE", this.selectedItem);
        }
        if (this.mode === "income") {
          await this.$store.dispatch("DELETE_INCOME", this.selectedItem);
        }
        this.dialogDelete = false;
      }
    }
  };
</script>

