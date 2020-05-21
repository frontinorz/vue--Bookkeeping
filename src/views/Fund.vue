<template>
  <v-container
    fluid
    class="pb-12"
  >
    <v-row>
      <v-col
        cols="12"
        class="pt-0"
      >
        <FundDate />
        <v-divider></v-divider>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <FundInput />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <FundList :itemList=itemTable />
      </v-col>
      <!-- if there is special expense -->
      <v-col
        cols="12"
        md="6"
        v-if="mode === 'expense' && itemTableSpecial.length"
      >
        <FundList
          :itemList=itemTableSpecial
          :title="'特別支出'"
        />
      </v-col>
    </v-row>
    <FundFoot />
  </v-container>
</template>

<script>
  import FundDate from "@/components/Fund/FundDate.vue";
  import FundInput from "@/components/Fund/FundInput.vue";
  import FundList from "@/components/Fund/FundList.vue";
  import FundFoot from "@/components/Fund/FundFoot.vue";

  export default {
    components: {
      FundDate,
      FundInput,
      FundList,
      FundFoot
    },
    mounted() {},
    computed: {
      mode() {
        return this.$store.state.route.name;
      },
      itemTable() {
        if (this.mode === "expense") {
          return this.$store.getters["getDateTable"](this.mode);
        } else {
          return this.$store.getters["getDateTable"](this.mode);
        }
      },
      itemTableSpecial() {
        return this.$store.getters["getDateTable"]("special");
      }
    },
    data: () => ({})
  };
</script>