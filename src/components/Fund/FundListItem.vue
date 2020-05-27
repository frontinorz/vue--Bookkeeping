<template>
  <v-list-item>
    <v-list-item-icon>
      <v-icon>{{ category.icon }}</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>{{ category.title }}</v-list-item-title>
      <v-list-item-subtitle>
        <pre>{{ item.descr }}</pre>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action class="my-1">
      <v-list-item-action-text class="subtitle-2 text-right m-l-auto">{{ item.amount }}</v-list-item-action-text>
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
      item: {
        type: Object,
        required: true
      }
    },
    data() {
      return {};
    },
    computed: {
      mode() {
        return this.$store.state.route.name;
      },
      category() {
        return this.$store.getters["getCategoryItem"](this.mode)(
          this.item.category_id
        );
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
  .v-list--three-line .v-list-item,
  .v-list-item--three-line {
    @media screen and (max-width: 600px) {
      min-height: 68px;
    }
  }
</style>