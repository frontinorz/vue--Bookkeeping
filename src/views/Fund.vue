<template>
  <v-container
    fluid
    class="pb-12"
  >
    <v-row>
      <v-col cols="12">
        <FundDate />
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
        <FundList />
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
    data: () => ({}),
    beforeCreate() {
      this.$store.commit("ADD_DATE");
    }
  };
</script>