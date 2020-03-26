<template>
  <div>
    <v-card>
      <v-card-title :class="colorTheme">
        <span class="white--text">{{ modeText.title }}</span>
      </v-card-title>
      <v-container>
        <v-list
          three-line
          class="subtitle-one-line"
        >
          <template v-if="itemList.length">
            <v-list-item-group active-class="pink--text">
              <FundListItem
                v-for="(cost, index) in itemList"
                :key="index"
                :cost="cost"
              >
                <template>
                  <v-btn
                    icon
                    @click="editDialogTrigger(index, cost)"
                  >
                    <v-icon color="grey lighten-1">mdi-pencil-outline</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    @click="deleteDialogTrigger(index)"
                  >
                    <v-icon color="grey lighten-1">mdi-trash-can-outline</v-icon>
                  </v-btn>
                </template>
              </FundListItem>
              <v-divider></v-divider>
            </v-list-item-group>
            <v-list-item>
              <v-list-item-icon>
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
    <v-dialog v-model="dialogEdit">
      <FundEdit
        :target="selectedItem"
        :id="selectedId"
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
            title: "消費明細",
            textNoItem: "目前沒有消費資料!",
            textDelete: "確定要刪除此筆消費?"
          },
          {
            mode: "income",
            title: "收入明細",
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
      itemList() {
        return this.$store.getters["getTargetTable"];
      },
      feeSum() {
        if (!this.itemList.length) return;
        return this.itemList.map(item => item.amount).reduce((a, b) => a + b);
      }
    },
    methods: {
      editDialogTrigger(id, item) {
        this.selectedItem = item;
        this.selectedId = id;
        this.dialogEdit = true;
      },
      deleteDialogTrigger(id) {
        this.selectedId = id;
        this.dialogDelete = true;
      },
      deleteHandler() {
        this.$store.commit("DELETE_ITEM", this.selectedId);
        this.dialogDelete = false;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .subtitle-one-line .v-list-item .v-list-item__subtitle,
  .subtitle-one-line .v-list-item--three-line .v-list-item__subtitle {
    -webkit-line-clamp: 1;
  }
  .v-list-item--active .v-list-item__subtitle {
    max-height: 150px;
    overflow: auto;
    -webkit-line-clamp: 999 !important;
  }
</style>