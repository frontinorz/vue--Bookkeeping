<template>
  <v-col
    cols="6"
    sm="12"
    md="6"
  >
    <v-card>
      <v-card-title class="blue darken-1">
        <span class="white--text">支出明細</span>
      </v-card-title>
      <v-container>
        <v-list
          three-line
          class="subtitle-one-line"
        >
          <v-list-item-group active-class="pink--text">
            <FundListItem
              v-for="cost in costList"
              :key="cost._id"
              :cost="cost"
            />
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-icon>
                <v-icon></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>共計</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text class="subtitle-2 pr-1">{{ costSum }}</v-list-item-action-text>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-container>
    </v-card>
  </v-col>
</template>

<script>
  import FundListItem from "@/components/FundListItem";

  export default {
    components: {
      FundListItem
    },
    data() {
      return {
        dialog: false
      };
    },
    computed: {
      costList() {
        return this.$store.state.costList;
      },
      costSum() {
        return this.costList.map(cost => cost.amount).reduce((a, b) => a + b);
      }
    },
    methods: {
      deleteHandler() {}
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