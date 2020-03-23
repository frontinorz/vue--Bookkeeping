<template>
  <v-list-item>
    <v-list-item-icon>
      <v-icon>{{ category.icon }}</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>{{ category.title }}</v-list-item-title>
      <v-list-item-subtitle>
        <pre>{{ cost.descr }}</pre>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-list-item-action-text class="subtitle-2 text-right m-l-auto">{{ cost.amount }}</v-list-item-action-text>
      <v-col class="pa-0">
        <slot>
        </slot>
      </v-col>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
  export default {
    props: {
      cost: {
        type: Object,
        required: true
      }
    },
    data() {
      return {};
    },
    computed: {
      category() {
        return this.$store.getters["getCategoryItem"](this.cost.category_id);
      }
    }
  };
</script>