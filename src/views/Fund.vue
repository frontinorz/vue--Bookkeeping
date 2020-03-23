<template>
  <v-container fluid>
    <v-row>
      <FundDate />
      <v-col
        cols="6"
        sm="12"
        md="6"
      >
        <FundInput />
      </v-col>
      <FundList />
    </v-row>
  </v-container>
</template>

<script>
  import FundDate from "@/components/FundDate.vue";
  import FundInput from "@/components/FundInput.vue";
  import FundList from "@/components/FundList.vue";

  export default {
    components: {
      FundDate,
      FundInput,
      FundList
    },
    props: {
      source: String
    },
    data: () => ({}),
    beforeCreate() {
      this.$store.commit("ADD_DATE");
    },
    computed: {}
  };
</script>